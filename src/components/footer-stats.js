import AbstractComponent from './abstract-component.js';

const createFooterStatsTemplate = (count) =>
  `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;

class FooterStats extends AbstractComponent {
  constructor(count) {
    super(count);
    this._count = count;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._count);
  }
}

export default FooterStats;
