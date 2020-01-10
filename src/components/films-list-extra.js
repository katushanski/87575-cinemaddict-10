import {createElement} from '../util.js';

const createFilmListExtraTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

class FilmsListExtra {
  constructor(title) {
    this._element = null;
    this._title = title;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmsListExtra;
