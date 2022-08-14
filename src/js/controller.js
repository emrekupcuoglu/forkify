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
    //If we don't wait then line below will be executed immediatly and our code will break.
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
  }
  catch (err) {
    recipeView.renderError();
  }

};






//?The MVC Architecture

//Why do we need an architecture when we build software
//1. Structure: Architecture will give our project structure
//In software structure basically is how we organize
//and divide our code into different modules, classes
//and functions
//2. Maintability: When we build a project we always need to
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

//The perfert architecture is basically one that allows
//all of these three aspects of structure, maintability
//and, expendability. In order to achieve that perfect
//architecture we can create our own architecture from scratch.
//And that is exactly what we did in the mapty project.
//However that only workd with a really small project
//But when the project grows more complex it is going to be
//very hard to achieve a good architrcture completely
//on our own. We opt for a well established architecture
//pattern that developers have been using for years or decades
//Examples are model view controller, model view presenter, Flux, etc.
//These days many developers actually use a framework like React, Vue, Angular etc.
//to take care of the architecture for them.
//So developers don't have to think a lot about architectures ontheir own
//This is a good idea at a certain point, specially for large scale
//applications. However, it is very important that you really know JavaScript
//before switching to some of these frameworks. And that includes
//knowing how to implement an architecture by yourself.
//Thats is why you will learn with this project among many other things
//So it will be easier to learn React or Vue or another
//framework that you choose down the road. No matter where
//the architecture comes from and who develops it, there are some components
//Every architecture must have:
//BUSINESS LOGIC, STATE,HTPP LIBRARY,APPLICATION LOGIC(ROUTER), PRESENTATION LOGIC(UI LAYER) 


//?BUSINESS LOGIC
//Business logic is all the code that solves the actual business problem
//Directly related to what the business does and what it needs
//Example sending messages, storing transactions, calculating taxes

//?STATE
//Stores all the data about the application's front end
//So the state should store any data you might fetch from an API
//or the data the user inputs or what page the useara is currently viewing etc.
//Should be the single source of truth.
//The UI should be kept in sync with the state.
//Storing and displaying data and keeping everything in sycn
//is one of the most difficult tasks when building web applications.
//Thats why there are many state management libraries like reduX or mobX
//But in this project wea will keep things simple and
//use a simple object to store out entire state

//?HTTP LIBRARY
//Responsible for making and recieving AJAX requests
//Optional but almost always necessary in real world apps

//?APPLICATION LOGIC(ROUTER)
//Code that is only concerned about implementation
//of the application itself
//Handles navigation and UI events

//?PRESANTATION LOGIC(UI LAYER)
//Code that is concerned about the visible part of 
//the application. Essentially displays application
//state

//Any good architecture has a way of seperating these components.
//So instead ofmixing every thing together in one big file
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
//One of the goals of this the MVC pattern is to seperate the
//application and business logic. Which makes develoing easier.
//But because of the seperation we need something to connect
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

//?Publisher-Subscriber Pattern
//We want he logic related to the DOM in the view
//But we want to handle the application logic 
//in the controller. We need a way to pass
//the controlRecipe function to the view.
//This is not possible with our current architecture
//because we are not importing the contol.js in the recipeView.js
//To fix this we use the publisher-subscriber pattern.
//Publisher doesn't know that the subscriber exist.

//With the publisher-subscriber pattern we create a init
//function and called that function when the app starts
//And we pass in the controlRecipe function to the view.
//This way we listen to the event in the view but handle
//the application logic inside the controller. 

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
  }
  else if (model.state.recipe.bookmarked) {
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

//Because the model.uploadRecipe is an async fucntion
//controlRecipe needs to be an async function and
//needs to await uploadRecipe as well.
//If we change the model.uploadRecipe to a
//synchronous function then we don't need
//the controlRecipe to be an asycn function
//Right now it works as a sync funt,on as well
//But it will change in the future
//!The takeaway here is this:
//If the funtion you are calling is an async
//function and you are trying to handle the error
//you get from there; then the calling funtion 
//must be async too.
//!IF YOU ARE CALLING AN ASYNC FUNCTION THAN CALL IT FROM AN ASYNC FUNCTION AND AWAIT IT.
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
    //We can use the history API to change the hash
    //This allows us to change the url without reloading
    //pushState takes in three arguments
    //First argument is state and doesn't matter for this case
    //Second one is the title which is also not relevant
    //Third one is the URL
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





























