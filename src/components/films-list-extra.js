import AbstractComponent from './abstract-component.js';

const createFilmListExtraTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

class FilmsListExtra extends AbstractComponent {
  constructor(title) {
    super(title);
    this._title = title;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._title);
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}

export default FilmsListExtra;
