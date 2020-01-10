import {generateFilmCards} from './mock/mock.js';
import {
  isEscEvent,
  getRandomNumber,
  getCountByProperty,
  sortRandomArray,
  render
} from './util.js';
import CardElement from './components/film-card.js';
import FilmsList from './components/films-list.js';
import FilmsListExtra from './components/films-list-extra.js';
import FilterComponent from './components/filter.js';
import FooterStats from './components/footer-stats.js';
import ShowMoreButton from './components/load-button.js';
import SortComponent from './components/menu-sort.js';
import Popup from './components/popup.js';
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
render(siteMainElement, new FilterComponent(allFilters).getElement());
render(siteMainElement, new SortComponent().getElement());

// main list movies rendering
const filmsList = new FilmsList();
render(siteMainElement, filmsList.getElement());
const filmsElement = filmsList.getElement();

// rendering each card and corresponding popup as well as adding event listeners
const renderFilmCards = (container, list, count) => {
  list.slice(0, count).forEach((film) => {
    const card = new CardElement(film);
    const popup = new Popup(film);

    render(container, card.getElement());

    const cardTitle = card.getElement().querySelector(`.film-card__title`);
    const cardPoster = card.getElement().querySelector(`.film-card__poster`);
    const cardComments = card.getElement().querySelector(`.film-card__comments`);

    const showPopup = () => {
      popup.renderComments(film.comments);
      render(document.body, popup.getElement());
      const popupCloseButton = popup.getElement().querySelector(`.film-details__close-btn`);
      popupCloseButton.addEventListener(`click`, closePopup);
      window.addEventListener(`keydown`, onPopupEscPress);
    };

    const closePopup = () => {
      popup.getElement().remove();
      popup.removeElement();
    };

    const onPopupEscPress = (evt) => {
      if (isEscEvent(evt)) {
        closePopup();
      }
    };

    const interactiveCardElements = [cardTitle, cardPoster, cardComments];

    interactiveCardElements.forEach((element) => {
      element.addEventListener(`click`, showPopup);
    });
  });
};

renderFilmCards(filmsList.getContainer(), films, FILM_MAIN_COUNT);

// extra list movies rendering
const renderFilmsListExtra = (container, criterion, title) => {
  const extraSection = new FilmsListExtra(title);
  render(filmsElement, extraSection.getElement());
  let sortedFilmCards = sortRandomArray(films.slice(), criterion);
  renderFilmCards(extraSection.getContainer(), sortedFilmCards, FILM_EXTRA_COUNT);
};

const checkTopRated = (movies) => {
  let counter = 0;
  for (const film of movies) {
    if (film.rating > 0) {
      counter = counter + 1;
    }
  }
  return counter > 0;
};

const checkMostCommented = (movies) => {
  let counter = 0;
  for (const film of movies) {
    if (film.comments.length > 0) {
      counter = counter + 1;
    }
  }
  return counter > 0;
};

// cheking the neccessity of rendering extra blocks
const renderFilmsExtraLists = (container, filmCards) => {
  const isTopRated = checkTopRated(filmCards);

  if (isTopRated) {
    renderFilmsListExtra(container, `rating`, `Top rated`);
  }
  const isMostCommented = checkMostCommented(filmCards);

  if (isMostCommented) {
    renderFilmsListExtra(container, `commentsCount`, `Most commented`);
  }
};

// "show more" button rendering
if (films.length) {
  render(filmsList.getElement().querySelector(`.films-list`), new ShowMoreButton().getElement());
  const showMoreButton = filmsList.getElement().querySelector(`.films-list__show-more`);
  let showingFilmsCount = FILM_MAIN_COUNT;

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + FILM_MAIN_COUNT;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => render(filmsList.getContainer(), new CardElement(film).getElement()));

    if (showingFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
} else {
  const filmsListTitle = filmsElement.querySelector(`.films-list__title`);

  filmsListTitle.classList.remove(`visually-hidden`);
  filmsListTitle.innerHTML = `There are no movies in our database`;
}

renderFilmsExtraLists(filmsList.getElement(), films);
// footer stats rendering
const renderFooterStats = (amount) => {
  const siteFooterElement = document.querySelector(`footer`);
  render(siteFooterElement, new FooterStats(amount).getElement());
};

renderFooterStats(FILM_AMOUNT);
