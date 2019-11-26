export const createFilmSectionTemplate = () =>
  `<section class="films">
  </section>`;

export const createFilmListTemplate = (title, isExtra, type) =>
  `<section class="films-list${(isExtra) ? `--extra` : ` `}">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container films-list__container--${type}">
    </div>
  </section>`;
