import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import { MODAL_CLOSE_SEC, MODAL_RESET_SEC } from "./config.js";

import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

//With parcel we can import more than JavaScript files.
//That includes images as well
// import icons from "../img/icons.svg" for parcel 1
//With parcel for any static assets that are not programming files
//e.g. images, videos or sound files etc.
//We need to write url:{path}
//*Adding url before the path like url:{path} turns this into a url
// import icons2 from "url:../img/icons.svg";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //0 Update the results view to mark the selected search result
    resultsView.update(model.getSearchResultsPage());

    //1. Loading Recipe

    //We await the loadRecipe function because it is an async function.
    //If we don't wait then line below will be executed immediately and our code will break.
    await model.loadRecipe(id);

    //2. Rendering Recipe
    recipeView.render(model.state.recipe);

    //3. Update the bookmarks view
    bookmarksView.update(model.state.bookmarks);

    console.log(model.state.recipe);

    //!Icons don't work properly the reason for that is:
    //We are using this line of code
    //<svg class="recipe__info-icon">
    // <use href="src/img/icons.svg#icon-users"></use>
    //</svg>
    //Here we are passing the wrong reference for icons
    //We are using this path for icons "src/img/icons.svg#icon-users"
    //But this pat his changed in the dist folder
    //because parcel changes the file names
    //We need to import the svg file to fix this

    //We first set the inner HTML to nothing to clear the page
    //before adding new content;
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1. Get Search Query
    const query = searchView.getQuery();
    // searchView.clearInputField();
    if (!query) return;

    //2. Load Search Results
    await model.loadSearchResults(query);

    //3. Render Results
    resultsView.render(model.getSearchResultsPage());

    //4 Render Initial Pagination Buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const paginationHandler = function (goToPage) {
  //Render NEW Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Render NEW Pagination Buttons
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  //Update the servings (in state)
  model.updateServings(servings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1. Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  }

  //2. Update recipe view
  recipeView.update(model.state.recipe);

  //3. Render Bookmarks
  bookmarksView.update(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show spinner
    addRecipeView.renderSpinner();

    //Upload new recipe
    await model.uploadRecipe(newRecipe);
    //Render recipe
    recipeView.render(model.state.recipe);

    //Display success message
    addRecipeView.renderMessage();

    //Render bookmarks
    bookmarksView.render(model.state.bookmarks);

    //Change ID in the URL

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //Close form window
    setTimeout(() => {
      addRecipeView.closeWindow();
    }, MODAL_CLOSE_SEC * 1000);

    setTimeout(() => {
      addRecipeView.render(model.state.recipe);
      addRecipeView.closeWindow();
    }, MODAL_RESET_SEC * 1000);
  } catch (err) {
    console.log(err, "🔴🔴🔴🔴");
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(paginationHandler);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
