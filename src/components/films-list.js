import AbstractComponent from './abstract-component.js';

const createFilmsListTemplate = () =>
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>
  </section>`;

class FilmsListComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createFilmsListTemplate();
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}

export default FilmsListComponent;
