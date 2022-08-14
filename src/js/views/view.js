const icons = new URL("../../img/icons.svg", import.meta.url);

export default class View {

  _data;

  /**
   * Redner the recieved object to the DOM.
   * @param {Object | Object[]} data the data to be rendered(e.g. recipe) 
   * @param {boolean} [render=true] If false create markup string instead of rendering to the DOM 
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Emre Küpçüoğlu
   * @todo Finish implementation
   */
  render(data, render = true) {
    //Checking if the data is undefined, null OR if the data is an empty array
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    // console.log(data);
    const markup = this._generateMarkup();
    if (!render) return markup;
    this.#clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);

  }

  update(data) {
    //!Watch lecture 302 Developing a DOM Updating Algorithm for more info
    //This update method takes data, compares what has changed
    //and renders the changed parts.

    this._data = data;
    const newMarkup = this._generateMarkup();


    //createRange returns a Range object(Range is a web API).
    //createContextualFragment is a method of the
    //Range object. createContextualFragment takes a string
    //as an argument and it converts that string to a
    //document fragment.
    //So createContextualFragment will convert that
    //string into real DOM node objects.
    //newDom will become a big object that is basically a virtual DOM
    //A virtual DOM, is a DOM that is not living on the page
    //but is living on the memory.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElelements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElelements[i];
      //isEqualNode compares two nodes and returns a boolean.
      // console.log(curEl, newEl.isEqualNode(curEl));

      // if (!newEl.isEqualNode(curEl)) {
      //This doesn't work because when there is a change
      //the container that contains the change is also
      //automaticly changed and this creates a problem
      // curEl.textContent = newEl.textContent;

      //We can use nodeValue to fix this.
      //Value of hte nodeValue will be null
      //for most things except text, comment
      //and a few other things
      //If it is text it will return the contents of the
      //text node.
      // }

      //We need to select the child node because
      //text is inside the child node

      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        //Update Changed TEXT
        // console.log("✔", newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      //! What if the first child is not a text but maybe the second one is text?
      //It works because of how elements in Html are usually written. Let's say we have this element

      // <h1 class='heading'>
      //   <span>hello</span>
      // </h1>
      // What is the first child of this element? I'll probably surprise you, but it's not <span>. It's a string consisting of 3 whitespace characters.

      // Why? Because I put a newline character and two whitespaces after <h1 class='heading'> to format the code, which also counts as a child of this <h1> element.

      // If I would write this element differently, the nodeValue would return null

      // <h1 class='heading'><span>hello</span></h1>

      //Update Changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {

        //We are replacing all the attributes
        //on the old element with the attributes
        //from the new element
        // console.log("curAttr", curEl.attributes);
        // console.log("newAttr", Array.from(newEl.attributes));

        //We take the name attribute and
        //set it to the value attribute
        //We are doing this:
        //attr.name=attr.value
        //attr.name is data-set-servings
        //So we are updating the data-set-servings
        //with the new value.
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }

    });




  }

  #clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons.href}#icon-loader"></use>
      </svg>
    </div>`;

    this.#clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);

  };

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons.href}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this.#clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons.href}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this.#clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

}