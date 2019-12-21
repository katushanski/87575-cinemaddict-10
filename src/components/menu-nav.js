import {createElement} from '../util.js';

const createFilterMarkup = (filter) => {
  const {title, count, source, isCountable, isActive, isAdditional} = filter;

  return `<a href="#${source}" class="main-navigation__item main-navigation__item${isActive ? `--active` : ``}${isAdditional ? `--additional` : ``}">${title} ${isCountable ? `<span class="main-navigation__item-count">${count}</span></a>` : `</a>`}`;
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

  return `<nav class="main-navigation">
    ${filtersMarkup}
  </nav>`;
};

class NavFilter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default NavFilter;
