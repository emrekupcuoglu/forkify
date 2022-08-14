import { async } from "regenerator-runtime";
import { API_URL, KEY, DEFAULT_SERVINGS, RESULTS_PER_PAGE } from "./config.js";
// import { getJSON, sendJSON } from "./helpers.js";
import { AJAX } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    //!Handy way to conditionally add property to an object
    //If recipe.key exist than it executes the right hand operation
    //if not it doesn't execute it
    //and it spreads the resulting object
    //this is same as key:recipe.key but only if recipe.key exist
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {

    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);
    //Creating a new object from the object we get from the API
    //We do this because the API has unusual variable names for JavaScript e.g cooking_time
    //We used destructuring



    //This also works
    // const recipe = {
    //   id: data.data.recipe.id,
    //   title: data.data.recipe.title,
    //   publisher: data.data.recipe.publisher,
    //   sourceUrl: data.data.recipe.sourceUrl,
    //   image: data.data.recipe.image_url,
    //   servings: data.data.recipe.servings,
    //   cookingTime: data.data.recipe.cooking_time,
    //   ingredients: data.data.recipe.ingredients,
    // };
    //Or we can create a recipeData object
    //and then take the data from that to a new object we create
    //That way we wouldn't mutate the recipe object


    //Or we can use the map() method to return a new array with only the object we need
    // const recipeDataArr = [data.data.recipe];
    // const recipeArr = recipeArr.map(entry => {
    //   console.log(entry);
    //   return recipe = {
    //     id: entry.id,
    //     title: entry.title,
    //     publisher: entry.publisher,
    //     sourceUrl: entry.sourceUrl,
    //     image: entry.image_url,
    //     servings: entry.servings,
    //     cookingTime: entry.cooking_time,
    //     ingredients: entry.ingredients,
    //   }
    // });
    // const [recipe]=recipeArr;
    // console.log(recipe);

    //Check if it is bookmarked
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }



  } catch (err) {
    //We don't want to handle the error here
    //So we need to re throw the error again
    //First we re-throw the error in the helpers.js
    //then we re -hrow it here 
    //and finally handle it inside the controller.js
    throw err;
  }

};

export const loadSearchResults = async function (query) {
  try {

    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),


      };
    });

    //Set the page back to 1
    state.search.page = 1;


  } catch (err) {

    console.log(`${err}🔴🔴🔴🔴`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {

  state.search.page = page;
  //Calculating the number of results per page
  //We take the page number and multiply it by
  //the amount of results we want.
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);

};



export const updateServings = function (newServings = DEFAULT_SERVINGS) {


  state.recipe.ingredients.forEach(ing => {

    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;

  });

  state.recipe.servings = newServings;

};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //Add Bookmark
  state.bookmarks.push(recipe);

  //Mark Current Recipe as Bookmark 
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmarks();

};


export const deleteBookmark = function (id) {
  //Delete Bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //Mark the current recipe as NOT bookmarked
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  persistBookmarks();

};


const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
console.log(state.bookmarks);


const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {

    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map(ing => {
        const ingArray = ing[1].split(",").map(el => el.trim());

        if (ingArray.length !== 3) throw new Error("Wrong ingredient format. Please use the correct format");
        const [quantity, unit, description] = ingArray;
        return { quantity: quantity ? Number(quantity) : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: Number(newRecipe.cookingTime),
      servings: Number(newRecipe.servings),
      ingredients,
    };
    // 1639173a-29e1-4ec2-9a18-16a0a7125024
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);

    addBookmark(state.recipe);

  } catch (err) {
    throw err;
  }



};