import {getRandomNumber} from '../util.js';
import {generateFilmCards} from '../mock/mock.js';


const FILM_AMOUNT = 15;
// array that contains all movies
const films = generateFilmCards(FILM_AMOUNT);

const getCountByProperty = (movies, property) =>
  movies.filter((film) => film[property]).length;

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

const createFilterMarkup = (filter) => {
  const {title, count, source, isCountable, isActive, isAdditional} = filter;

  return `<a href="#${source}" class="main-navigation__item main-navigation__item${isActive ? `--active` : ``}${isAdditional ? `--additional` : ``}">${title} ${isCountable ? `<span class="main-navigation__item-count">${count}</span></a>` : `</a>`}`;
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

  return `<nav class="main-navigation">
    ${filtersMarkup}
  </nav>`;
};

export {films, allFilters, createFilterTemplate};
