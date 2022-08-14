
class SearchView {
  #parentElement = document.querySelector(".search");

  getQuery() {
    //We could of used document.query selector as well
    const query = this.#parentElement.querySelector(".search__field").value;
    this.#clearInputField();
    return query;

  }

  #clearInputField() {
    this.#parentElement.querySelector(".search__field").value = "";
  }



  addHandlerSearch(handler) {
    //We used submit because this works no matter if the
    //user clicks the button or press the enter key.
    //We need the event, because of that we don't call the handler
    //as a callback function, instead we call the handler function
    //inside of the callback function.


    //!My way of implementing #clearInput
    //This is my way of implementing clearing of the input field
    //But in the course we clear it within the getQuery method

    const callback = function (e) {
      e.preventDefault();
      handler();
      this.#clearInputField();
      console.dir(this);

    };

    //We need to bind the .this keyword because #clearInputField
    //is a private method, and we need the .this keyword
    //to access that method 
    //So we create a new SearchView object and bind that to the
    //.this keyword of the callback function
    const callback2 = callback.bind(new SearchView);


    //We didn't use this because the course implemented in a different way
    // this.#parentElement.addEventListener("submit", callback2);

    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });

  };

}

export default new SearchView();