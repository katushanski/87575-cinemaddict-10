import {generateFilmCards} from './mock/mock.js';
import {render} from './utils/render.js';
import {getRandomNumber, getCountByProperty} from './utils/random.js';
import PageController from './controllers/controller.js';
import FilterComponent from './components/filter.js';
import FooterStats from './components/footer-stats.js';
import SortComponent from './components/menu-sort.js';
import PersonalRating from './components/user.js';

const FILM_AMOUNT = 15;

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

// page controller
const pageController = new PageController(document.querySelector(`main`));
pageController.render(films);

// footer stats rendering
const renderFooterStats = (amount) => {
  const siteFooterElement = document.querySelector(`footer`);
  render(siteFooterElement, new FooterStats(amount).getElement());
};

renderFooterStats(FILM_AMOUNT);
