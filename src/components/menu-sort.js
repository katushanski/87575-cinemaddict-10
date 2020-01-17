import AbstractComponent from './abstract-component.js';

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const createSortTemplate = () =>
  `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`;

class SortComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      evt.preventDefault();

      const sortType = evt.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        return;
      }

      this._element.querySelector(`.sort__button--active`)
        .classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);

      this._currentSortType = sortType;
      handler(sortType);
    });
  }
}

export default SortComponent;
