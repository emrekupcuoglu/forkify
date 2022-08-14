import View from "./view";

const icons = new URL("../../img/icons.svg", import.meta.url);

class AddRecipeView extends View {

  _parentElement = document.querySelector(".upload");
  _message = "Recipe was succesfully uploaded.";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");


  constructor() {
    super();
    this.#addHandlerShowWindow();
    this.#addHandlerHideWindow();
  }

  // toggleWindow() {
  //   this._overlay.classList.toggle("hidden");
  //   this._window.classList.toggle("hidden");
  // }

  closeWindow() {
    this._overlay.classList.add("hidden");
    this._window.classList.add("hidden");
  }

  openWindow() {
    this._overlay.classList.remove("hidden");
    this._window.classList.remove("hidden");
  }


  #addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.openWindow.bind(this));
  }

  #addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.closeWindow.bind(this));
    this._overlay.addEventListener("click", this.closeWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      //With ES219 there is a really useful
      //feature to convert entries into an object
      const data = Object.fromEntries(dataArr);
      handler(data);

      //We could of converted the entries
      //to an object likes this as well
      // const convertToObj = function () {
      //   const obj = {};
      //   newRecipe.forEach(arr => {
      //     obj[arr[0]] = arr[1];

      //   });
      //   console.log(obj);
      // };
      // convertToObj();

      //We also could of used a library like lodash
      //You might see this on old code bases
    });
  }

  _generateMarkup() {
    return `
  <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST23" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST23" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="TEST23" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST23" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
  <h3 class="upload__heading">Ingredients</h3>
  <label>Ingredient 1</label>
  <input
    value="0.5,kg,Rice"
    type="text"
    required
    name="ingredient-1"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 2</label>
  <input
    value="1,,Avocado"
    type="text"
    name="ingredient-2"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 3</label>
  <input
    value=",,salt"
    type="text"
    name="ingredient-3"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 4</label>
  <input
    type="text"
    name="ingredient-4"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 5</label>
  <input
    type="text"
    name="ingredient-5"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 6</label>
  <input
    type="text"
    name="ingredient-6"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
</div>

<button class="btn upload__btn">
  <svg>
    <use href="src/img/icons.svg#icon-upload-cloud"></use>
  </svg>
  <span>Upload</span>
</button>
`;


  }



}


export default new AddRecipeView();