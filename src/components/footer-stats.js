import {createElement} from '../util.js';

const createFooterStatsTemplate = (count) =>
  `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;

class FooterStats {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._count);
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

export default FooterStats;
