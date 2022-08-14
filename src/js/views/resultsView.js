//We created the previewView because both the
//resultsView and the bookmarksView generate
//the same markup. So the previewView is
//basically the parent of both of them

//When we call bookmarkView.render or
//results.render, 
//render method sets the data it gets as an argument
//to the this._data property
//then the  generateMarkup method of one of those
//classes is called. Then that method loops over the 
//array it gets from the this._data
//and for each element it calls the previewView.render()
//with the data argument and an additional argument
//called render
//render is set to true by default
//we set the render to false and it returns the 
//markup instead of rendering it.
//The returned markup is joined to make a string
//And that string is returned as well.
//With this the _generateMarkup() methods finishes
//and the first render method that was called continues
//and renders the bookmarks or the results

//We generate the markup in the previewView
//

//We could of done this with a parent class
//and that is preferable to me.
//To do that we need to create a previewView
//and set that as the paren class of 
//resultsView and bookmarksView
//With that we would not need to add a ssecond
//parameter to the render method.
//I think this is more easy to come up with
//and understand.

import View from "./view";
import previewView from "./previewView";

const icons = new URL("../../img/icons.svg", import.meta.url);

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes was found for your query! Please try again. ";
  _message = "";

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join("");
  }


}

export default new ResultsView();