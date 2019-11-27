import {createUserProfileTemplate} from './components/user.js';
import {createSiteNavigationTemplate} from './components/menu-nav.js';
import {createSortTemplate} from './components/menu-sort.js';
import {createFilmSectionTemplate, createFilmListTemplate} from './components/film-list.js';
import {createCardElementTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/load-button.js';
import {createFilmDetailsTemplate} from './components/popup.js';
import {render} from './components/render.js';

/*
  RENDERING
*/
const filmLists = [
  {title: `All movies. Upcoming`, cardCount: 5, isExtra: false, type: `all`},
  {title: `Top rated`, cardCount: 2, isExtra: true, type: `top`},
  {title: `Most commented`, cardCount: 2, isExtra: true, type: `popular`},
];

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserProfileTemplate());

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmSectionTemplate());

const filmsElement = document.querySelector(`.films`);
const renderCardElements = () =>
  filmLists.forEach((filmList) => {
    render(filmsElement, createFilmListTemplate(filmList.title, filmList.isExtra, filmList.type));

    let filmsListContainer = filmsElement.querySelector(`.films-list__container--${filmList.type}`);

    new Array(filmList.cardCount)
      .fill(``)
      .forEach(
          () => render(filmsListContainer, createCardElementTemplate())
      );

    if (!filmList.isExtra) {
      render(filmsListContainer, createShowMoreButtonTemplate(), `afterend`); // "show more" button rendering
    }

    const mainFilmsListTitle = filmsElement.querySelector(`.films-list h2`); // hiding the title
    mainFilmsListTitle.classList.add(`visually-hidden`);
  });
renderCardElements();

render(document.body, createFilmDetailsTemplate());
const filmDetailsElement = document.querySelector(`.film-details`);

const filmDetailsCloseButton = filmDetailsElement.querySelector(`.film-details__close-btn`);
const onFilmDetailsCloseButtonClick = function (evt) {
  filmDetailsElement.classList.add(`visually-hidden`);
  evt.target.removeEventListener(`click`, onFilmDetailsCloseButtonClick);
};

filmDetailsCloseButton.addEventListener(`click`, onFilmDetailsCloseButtonClick);
