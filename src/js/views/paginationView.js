import View from "./view";

const icons = new URL("../../img/icons.svg", import.meta.url);

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  #generateMarkupCode(curPage, buttonType) {


    if (buttonType === "prevBtn") {
      return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons.href}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
  `;
    }

    if (buttonType === "nextBtn") {
      return `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons.href}#icon-arrow-right"></use>
        </svg>
      </button>
  `;
    }

    return `
    <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons.href}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons.href}#icon-arrow-right"></use>
    </svg>
  </button>
`;

  }

  _generateMarkup() {

    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);


    //Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this.#generateMarkupCode(curPage, "nextBtn");
    }

    //Page 1 and there are no other pages

    if (curPage === 1 && numPages === 1) {
      return "";
    }

    //Last page
    if (curPage === numPages) {
      return this.#generateMarkupCode(curPage, "prevBtn");
    }

    //Other page
    return this.#generateMarkupCode(curPage);

  }




}


export default new PaginationView();