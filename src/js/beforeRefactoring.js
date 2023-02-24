import "core-js/stable";
import "regenerator-runtime/runtime";





//With parcel we can import more than JavaScript files.
//That includes images as well
// import icons from "../img/icons.svg" for parcel 1
//With parcel for any static assets that are not programming files
//e.g. images, videos or sound files etc.
//We need to write url:{path}
//*Adding url before the path like url:{path} turns this into a url
// import icons2 from "url:../img/icons.svg";



// !Parcel Migration: Importing SVG Icons

// Importing non-code assets from JavaScript

// In Parcel 1, importing any non-JavaScript file such as an image or video resulted in a URL. In Parcel 2, this still works for known file types such as images, but other file types without default support will require code changes.

// The preferred approach for referencing URLs in JavaScript is to use the URL constructor. However, you may also choose to prefix the dependency specifier in an import statement with url:.

// const downloadUrl = new URL('download.zip', import.meta.url);document.body.innerHTML = `<a href="${downloadUrl}">Download</a>`;

// So we could just use:

// const icons = new URL('../img/icons.svg', import.meta.url);
// then ${icons.href} to get the SVGs.

const icons = new URL("../img/icons.svg", import.meta.url);

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons.href}#icon-loader"></use>
    </svg>
  </div>`;

  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};


const showRecipe = async function () {
  try {

    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    //1. Loading Recipe
    renderSpinner(recipeContainer);
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    //Creating a new object from the object we get from the API
    //We do this because the API has unusual variable names for JavaScript e.g cooking_time
    //We us destructuring because we call recipe in both cases
    // let recipe = data.data.recipe //We used destructuring instead of this
    let { recipe } = data.data;
    //We created the recipe with let because we are going to change the names of the properties
    //*This is a quick way of doing this but not the best way to do it

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.sourceUrl,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

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


    console.log(recipe);

    //2. Rendering Recipe

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
    const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons.href}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons.href}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons.href}#icon-minus-circle></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons.href}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons.href}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons.href}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(ing => {
      return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons.href}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity !== null ? ing.quantity : ""}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>

      `;
    }).join("")}
            
            </li>
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons.href}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;

    //We first set the inner HTML to nothing to clear the page
    //before adding new content
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);






  }
  catch (err) {
    alert(err.message);
  }







};


//We listen to the hash change using an event listener
//And if the has has changed we displayed the recipe
// window.addEventListener("hashchange", showRecipe);
//hashchange works great when we click on a recipe
//But if we open a completely new page with the hash
//It doesn't work because has doesn't change
//Instead we can use the load event the run this
//function when the page loads 
// window.addEventListener("load", showRecipe);



//*We have duplicate code above
//We can do this all at the same time
//Imagine you had ten events which you
//wanted to run the same event handler function
["hashchange", "load"].forEach(event => window.addEventListener(event, showRecipe));



//?The MVC Architecture

//Why do we need an architecture when we build software
//1. Structure: Architecture will give our project structure
//In software structure basically is how we organize
//and divide our code into different modules, classes
//and functions
//2. Maintainability: When we build a project we always need to
//think about the future and keep in mind that the project
//is never really done. We will always need to change things
//in the future and will need to maintain the project
//And that only works if the project is nicely structured
//3. Expendability: Expandability is the ability to
//easily add featured in the future.
//We might want to add new
//features to the project in the future
//And that is only possible with a good structure
//And a good overall architecture

//The perfect architecture is basically one that allows
//all of these three aspects of structure, maintainability
//and, expendability. In order to achieve that perfect
//architecture we can create our own architecture from scratch.
//And that is exactly what we did in the mapty project.
//However that only works with a really small project
//But when the project grows more complex it is going to be
//very hard to achieve a good architecture completely
//on our own. We opt for a well established architecture
//pattern that developers have been using for years or decades
//Examples are model view controller, model view presenter, Flux, etc.
//These days many developers actually use a framework like React, Vue, Angular etc.
//to take care of the architecture for them.
//So developers don't have to think a lot about architectures on their own
//This is a good idea at a certain point, specially for large scale
//applications. However, it is very important that you really know JavaScript
//before switching to some of these frameworks. And that includes
//knowing how to implement an architecture by yourself.
//Thats is why you will learn with this project among many other things
//So it will be easier to learn React or Vue or another
//framework that you choose down the road. No matter where
//the architecture comes from and who develops it, there are some components
//Every architecture must have:
//BUSINESS LOGIC, STATE, HTTP LIBRARY, APPLICATION LOGIC(ROUTER), PRESENTATION LOGIC(UI LAYER)


//?BUSINESS LOGIC
//Business logic is all the code that solves the actual business problem
//Directly related to what the business does and what it needs
//Example sending messages, storing transactions, calculating taxes

//?STATE
//Stores all the data about the application's front end
//So the state should store any data you might fetch from an API
//or the data the user inputs or what page the user is currently viewing etc.
//Should be the single source of truth.
//The UI should be kept in sync with the state.
//Storing and displaying data and keeping everything in sync
//is one of the most difficult tasks when building web applications.
//Thats why there are many state management libraries like reduX or mobX
//But in this project wea will keep things simple and
//use a simple object to store out entire state

//?HTTP LIBRARY
//Responsible for making and receiving AJAX requests
//Optional but almost always necessary in real world apps

//?APPLICATION LOGIC(ROUTER)
//Code that is only concerned about implementation
//of the application itself
//Handles navigation and UI events

//?PRESENTATION LOGIC(UI LAYER)
//Code that is concerned about the visible part of
//the application. Essentially displays application
//state

//Any good architecture has a way of separating these components.
//So instead of mixing every thing together in one big file
//and in one big mess.
//Let's take a look at a well established architecture pattern
//that we are going to use in this project

//?Model View Controller Architecture
//This architecture contains three big
//parts. The model, the view and, the controller.

//*VIEW
//The view is for the presentation logic.
//It is the part that interacts with the user.

//*MODEL
//The model is all about the applications data
//It usually contains the state and the business logic
//that manipulates the state
//The model also contains the http library that might get some data
//from the web, like from an API or a backend.

//*CONTROLLER
//The controller contains the application logic
//It sits between the model and the view
//It creates a bridge between the view and the controller
//The model and the view should know nothing about each other
//Controller connects them together
//One of the goals of this the MVC pattern is to separate the
//application and business logic. Which makes developing easier.
//But because of the separation we need something to connect
//these parts, and that is the controller.
//*Check lecture 291 for more in depth information

//?Typical Flow of Actions and Data

//Let's take look a typical flow of actions and data as soon as
//event happens on the user interface for example a click
//To start it is going to be the controller who handle that
//event, because handling an event is doing something on
//the application and that is part of the application logic
//This handling might involve updating the user interface
//and also ask the model for some data. We can say that
//the controller dispatches tasks to the model and to the
//view. In other words in controls and orchestrates this
//entire action, and the whole application itself.
//Asking the model for some data might involve doing an
//AJAX request to the web and that is exactly what the model does
//When the data arrives controller takes the data and sends it
//to the view. The view will render that data to the user
//interface and finish this cycle.



































