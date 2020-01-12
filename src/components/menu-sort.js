import AbstractComponent from './abstract-component.js';

const createSortTemplate = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;

class SortComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createSortTemplate();
  }
}

export default SortComponent;
