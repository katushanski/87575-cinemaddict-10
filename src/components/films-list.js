import {createElement} from '../util.js';

const createFilmsContainerTemplate = () =>
  `<div class="films-list__container"></div>`;

const createFilmsListTemplate = () =>
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  </section>`;

class FilmsList {
  constructor() {
    this._element = null;
    this._container = null;
  }

  getContainer() {
    if (!this._container) {
      this._container = createElement(createFilmsContainerTemplate());
    }

    return this._container;
  }

  getTemplate() {
    return createFilmsListTemplate();
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

export default FilmsList;
