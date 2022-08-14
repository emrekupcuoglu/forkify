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

import View from "./view";
import previewView from "./previewView";

const icons = new URL("../../img/icons.svg", import.meta.url);

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmark found. Find a nice recipe and bookmark it ;) ";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false)).join("");
  }


}

export default new BookmarksView();