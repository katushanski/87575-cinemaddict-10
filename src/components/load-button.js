import AbstractComponent from './abstract-component.js';

const createShowMoreButtonTemplate = () =>
  `<button class="films-list__show-more">Show more</button>`;

class ShowMoreButtonComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export default ShowMoreButtonComponent;
