import View from "./view";
import previewView from "./previewView";

const icons = new URL("../../img/icons.svg", import.meta.url);

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes was found for your query! Please try again. ";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
