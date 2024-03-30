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

import View from "./view";

const icons = new URL("../../img/icons.svg", import.meta.url);

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
  <li class="preview">
  <a class="preview__link ${
    this._data.id === id ? "preview__link--active" : ""
  }" href="#${this._data.id}">
    <figure class="preview__fig">
      <img src="${this._data.image}" alt="${this._data.title}" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${this._data.title}</h4>
      <p class="preview__publisher">${this._data.publisher}</p>
    </div>
    <div class="preview__user-generated ${this._data.key || "hidden"}">
      <svg>
        <use href="${icons.href}#icon-user"></use>
      </svg>
    </div>
  </a>
</li>
`;
  }
}

export default new PreviewView();
