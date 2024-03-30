class SearchView {
  #parentElement = document.querySelector(".search");

  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value;
    this.#clearInputField();
    return query;
  }

  #clearInputField() {
    this.#parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    const callback = function (e) {
      e.preventDefault();
      handler();
      this.#clearInputField();
      console.dir(this);
    };

    const callback2 = callback.bind(new SearchView());

    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
