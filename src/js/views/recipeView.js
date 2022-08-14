import View from "./view";
// !Parcel Migration: Importing SVG Icons

// Importing non-code assets from JavaScript

// In Parcel 1, importing any non-JavaScript file such as an image or video resulted in a URL. In Parcel 2, this still works for known file types such as images, but other file types without default support will require code changes.

// The preferred approach for referencing URLs in JavaScript is to use the URL constructor. However, you may also choose to prefix the dependency specifier in an import statement with url:.

// const downloadUrl = new URL('download.zip', import.meta.url);document.body.innerHTML = `<a href="${downloadUrl}">Download</a>`;

// So we could just use:

// const icons = new URL('../img/icons.svg', import.meta.url);
// then ${icons.href} to get the SVGs.

const icons = new URL("../../img/icons.svg", import.meta.url);
import { Fraction } from "fractional";


class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one";
  _message = "";




  _generateMarkup() {
    console.log(this._data);



    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons.href}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons.href}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
        <span class="recipe__info-text">servings</span>
          <button data-servings="${this._data.servings}" class="btn--tiny btn--decrease-servings">
            <svg>
              <use href="${icons.href}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-servings="${this._data.servings}" class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons.href}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>


      <div class="recipe__user-generated ${this._data.key || "hidden"}">
        <svg>
          <use href="${icons.href}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons.href}#icon-bookmark${this._data.bookmarked ? "-fill" : ""}"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._data.ingredients.map(this.#generateMarkupIngredient).join("")}
        
        </li>
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons.href}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
`;
  }
  #generateMarkupIngredient(ing) {
    if (ing.quantity < 0) ing.quantity = ing.quantity * -1;
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons.href}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${ing.quantity !== null ? new Fraction(ing.quantity).toString() : ""}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>

  `;
  };

  addHandlerRender(handler) {
    //We listen to the hash change using an event listener
    //And if the has has changed we displayed the recipe
    // window.addEventListener("hashchange", controlRecipes);
    //hashchange works great when we click on a recipe
    //But if we open a completely new page with the hash
    //It doesn't work because has doesn't change
    //Instead we can use the load event the run this
    //function when the page loads 
    // window.addEventListener("load", controlRecipes);

    //*We have duplicate code above
    //We can do this all at the same time
    //Imagine you had ten events which you
    //wanted to run the same event handler function
    ["hashchange", "load"].forEach(event => window.addEventListener(event, handler));


  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {

      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;
      const curServing = Number(btn.dataset.servings);
      if (btn.classList.contains("btn--increase-servings")) {

        const newServings = curServing + 1;
        handler(newServings);
      }
      if (btn.classList.contains("btn--decrease-servings") && curServing > 1) {
        const newServings = curServing - 1;
        handler(newServings);
      }

    });



  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

};

export default new RecipeView();