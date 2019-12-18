import {generateFilmCards} from './mock/mock.js';
import {getRandomNumber, getCountByProperty, sortRandomArray} from './util.js';
import {createCommentTemplate} from './components/comment.js';
import {render} from './components/render.js';
import {createCardElementTemplate} from './components/film-card.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmListExtraTemplate} from './components/films-list-extra.js';
import {createFooterStatsTemplate} from './components/footer-stats.js';
import {createShowMoreButtonTemplate} from './components/load-button.js';
import {createFilterTemplate} from './components/menu-nav.js';
import {createSortTemplate} from './components/menu-sort.js';
import {createFilmDetailsTemplate} from './components/popup.js';
import {createPersonalRatingTemplate} from './components/user.js';

const FILM_AMOUNT = 15;
const FILM_MAIN_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

// array that contains all movies
const films = generateFilmCards(FILM_AMOUNT);

// navigation filters
const allFilters = [
  {
    title: `All movies`,
    count: getRandomNumber(0, 20, true),
    source: `all`,
    isCountable: false,
    isActive: true,
    isAdditional: false
  }, {
    title: `Watchlist`,
    count: getCountByProperty(films, `isInWatchList`),
    source: `watchlist`,
    isCountable: true,
    isActive: false,
    isAdditional: false
  }, {
    title: `History`,
    count: getCountByProperty(films, `isWatched`),
    source: `history`,
    isCountable: true,
    isActive: false,
    isAdditional: false
  }, {
    title: `Favorites`,
    count: getCountByProperty(films, `isFavorite`),
    source: `favorites`,
    isCountable: true,
    isActive: false,
    isAdditional: false
  }, {
    title: `Stats`,
    source: null,
    link: `stats`,
    isCountable: false,
    isActive: false,
    isAdditional: true
  }
];

// header and user markup
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createPersonalRatingTemplate(getRandomNumber(0, 25, true)));

// main and menu markup
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createFilterTemplate(allFilters));
render(siteMainElement, createSortTemplate());

// main list movies rendering
render(siteMainElement, createFilmsListTemplate());
const filmsElement = siteMainElement.querySelector(`.films`);
const filmsMainList = siteMainElement.querySelector(`.films-list`);

const renderFilmCards = (container, list, count) => {
  render(container, createFilmsContainerTemplate());
  let filmsListContainer = container.querySelector(`.films-list__container`);
  const filmsListMarkup = list.slice(0, count).map((card) => {
    return createCardElementTemplate(card);
  }).join(`\n`);

  render(filmsListContainer, filmsListMarkup);
};

renderFilmCards(filmsMainList, films, FILM_MAIN_COUNT);

// extra list movies rendering
const createExtraMarkup = (criterion, title) => {
  render(filmsElement, createFilmListExtraTemplate(title));
  let extraList = filmsElement.querySelector(`.films-list--extra:last-of-type`);
  let sortedFilmCards = sortRandomArray(films.slice(), criterion);
  renderFilmCards(extraList, sortedFilmCards, FILM_EXTRA_COUNT);
};

// cheking the neccessity of rendering extra blocks

const renderFilmsListExtra = (filmCards) => {
  const checkTopRated = (movies) => {
    let counter = 0;

    for (const film of movies) {
      if (film.rating > 0) {
        counter = counter + 1;
      }
    }

    return counter > 0;
  };

  const isTopRated = checkTopRated(filmCards);

  if (isTopRated) {
    createExtraMarkup(`rating`, `Top rated`);
  }

  const checkMostCommented = (movies) => {
    let counter = 0;

    for (const film of movies) {
      if (film.comments.length > 0) {
        counter = counter + 1;
      }
    }

    return counter > 0;
  };

  const isMostCommented = checkMostCommented(filmCards);

  if (isMostCommented) {
    createExtraMarkup(`commentsCount`, `Most commented`);
  }
};

renderFilmsListExtra(films);

// "show more" button rendering
render(filmsMainList, createShowMoreButtonTemplate());
const showMoreButton = filmsMainList.querySelector(`.films-list__show-more`);
let showingFilmsCount = FILM_MAIN_COUNT;

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILM_MAIN_COUNT;
  const filmsListContainer = filmsMainList.querySelector(`.films-list__container`);

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainer, createCardElementTemplate(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  } else {
    filmsElement.querySelector(`.films-list__title`).innerHTML = `There are no movies in our database`;
  }
});

// footer stats rendering
const renderFooterStats = (amount) => {
  const siteFooterElement = document.querySelector(`footer`);
  render(siteFooterElement, createFooterStatsTemplate(amount));
};

renderFooterStats(FILM_AMOUNT);

// popup rendering
const popupFilmCard = films[getRandomNumber(0, films.length - 1, true)];
const renderPopup = (film) => {
  render(document.body, createFilmDetailsTemplate(film));

  const filmDetailsElement = document.querySelector(`.film-details`);
  const filmDetailsCloseButton = filmDetailsElement.querySelector(`.film-details__close-btn`);
  const onFilmDetailsCloseButtonClick = function (evt) {
    filmDetailsElement.classList.add(`visually-hidden`);
    evt.target.removeEventListener(`click`, onFilmDetailsCloseButtonClick);
  };

  filmDetailsCloseButton.addEventListener(`click`, onFilmDetailsCloseButtonClick);

  // comments rendering
  const commentsContainer = filmDetailsElement.querySelector(`.film-details__comments-list`);

  const renderComments = () => {
    const createCommentsMarkup = Array.from(film.comments).slice(0, film.commentsCount).map((comment) => {
      return createCommentTemplate(comment);
    }).join(`\n`);

    render(commentsContainer, createCommentsMarkup);
  };

  renderComments();
};

renderPopup(popupFilmCard);
