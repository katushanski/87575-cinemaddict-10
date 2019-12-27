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
render(siteMainElement, new FilmsList().getElement());
const filmsElement = siteMainElement.querySelector(`.films`);
const filmsMainList = siteMainElement.querySelector(`.films-list`);

// rendering each card and corresponding popup as well as adding event listeners
const renderFilmCards = (container, list, count) => {
  render(container, new FilmsList().getContainer());
  let filmsListContainer = container.querySelector(`.films-list__container`);

  list.slice(0, count).forEach((film) => {
    const card = new CardElement(film);
    const popup = new Popup(film);

    const commentsContainer = popup.getElement().querySelector(`.film-details__comments-list`);
    popup.renderComments(commentsContainer, film.comments);

    render(filmsListContainer, card.getElement());

    const cardTitle = card.getElement().querySelector(`.film-card__title`);
    const cardPoster = card.getElement().querySelector(`.film-card__poster`);
    const cardComments = card.getElement().querySelector(`.film-card__comments`);
    const popupCloseButton = popup.getElement().querySelector(`.film-details__close-btn`);

    const showPopup = () => {
      render(document.body, popup.getElement());
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

    popupCloseButton.addEventListener(`click`, closePopup);
    window.addEventListener(`keydown`, onPopupEscPress);
  });
};

renderFilmCards(filmsMainList, films, FILM_MAIN_COUNT);

// extra list movies rendering
const renderFilmsListExtra = (criterion, title) => {
  render(filmsElement, new FilmsListExtra(title).getElement());
  let extraList = filmsElement.querySelector(`.films-list--extra:last-of-type`);
  let sortedFilmCards = sortRandomArray(films.slice(), criterion);
  renderFilmCards(extraList, sortedFilmCards, FILM_EXTRA_COUNT);
};

// cheking the neccessity of rendering extra blocks
const getFilmsListExtra = (filmCards) => {
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
    renderFilmsListExtra(`rating`, `Top rated`);
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
    renderFilmsListExtra(`commentsCount`, `Most commented`);
  }
};

getFilmsListExtra(films);

// "show more" button rendering
if (films.length) {
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
    }
  });
} else {
  const filmsListTitle = filmsElement.querySelector(`.films-list__title`);

  filmsListTitle.classList.remove(`visually-hidden`);
  filmsListTitle.innerHTML = `There are no movies in our database`;
}

// footer stats rendering
const renderFooterStats = (amount) => {
  const siteFooterElement = document.querySelector(`footer`);
  render(siteFooterElement, new FooterStats(amount).getElement());
};

renderFooterStats(FILM_AMOUNT);
