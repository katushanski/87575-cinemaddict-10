import {generateFilmCards} from './mock/mock.js';
import {getRandomNumber, getCountByProperty, sortRandomArray, render} from './util.js';
import CommentTemplate from './components/comment.js';
import CardElement from './components/film-card.js';
import FilmsContainer from './components/films-container.js';
import FilmsList from './components/films-list.js';
import FilmsListExtra from './components/films-list-extra.js';
import FooterStats from './components/footer-stats.js';
import ShowMoreButton from './components/load-button.js';
import NavFilter from './components/menu-nav.js';
import SortTemplate from './components/menu-sort.js';
import FilmDetails from './components/popup.js';
import PersonalRating from './components/user.js';

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
render(siteHeaderElement, new PersonalRating(getRandomNumber(0, 25, true)).getElement());

// main and menu markup
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new NavFilter(allFilters).getElement());
render(siteMainElement, new SortTemplate().getElement());

// main list movies rendering
render(siteMainElement, new FilmsList().getElement());
const filmsElement = siteMainElement.querySelector(`.films`);
const filmsMainList = siteMainElement.querySelector(`.films-list`);

const renderFilmCards = (container, list, count) => {
  render(container, new FilmsContainer().getElement());
  let filmsListContainer = container.querySelector(`.films-list__container`);
  const filmsListMarkup = list.slice(0, count).map((card) => {
    return new CardElement(card).getElement();
  }).join(`\n`);

  render(filmsListContainer, filmsListMarkup);
};

renderFilmCards(filmsMainList, films, FILM_MAIN_COUNT);

// extra list movies rendering
const createExtraMarkup = (criterion, title) => {
  render(filmsElement, new FilmsListExtra(title).getElement());
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
render(filmsMainList, new ShowMoreButton().getElement());
const showMoreButton = filmsMainList.querySelector(`.films-list__show-more`);
let showingFilmsCount = FILM_MAIN_COUNT;

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILM_MAIN_COUNT;
  const filmsListContainer = filmsMainList.querySelector(`.films-list__container`);

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainer, new CardElement(film).getElement()));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  } else {
    filmsElement.querySelector(`.films-list__title`).innerHTML = `There are no movies in our database`;
  }
});

// footer stats rendering
const renderFooterStats = (amount) => {
  const siteFooterElement = document.querySelector(`footer`);
  render(siteFooterElement, new FooterStats(amount).getElement());
};

renderFooterStats(FILM_AMOUNT);

// popup rendering
const popupFilmCard = films[getRandomNumber(0, films.length - 1, true)];
const renderPopup = (film) => {
  render(document.body, new FilmDetails(film).getElement());

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
      return new CommentTemplate(comment).getElement();
    }).join(`\n`);

    render(commentsContainer, createCommentsMarkup);
  };

  renderComments();
};

renderPopup(popupFilmCard);
