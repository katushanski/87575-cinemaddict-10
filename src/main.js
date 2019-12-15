import {getRandomNumber} from './util.js';
import {createCommentTemplate} from './components/comment.js';
import {render} from './components/render.js';
import {createCardElementTemplate} from './components/film-card.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmListExtraTemplate} from './components/films-list-extra.js';
import {createShowMoreButtonTemplate} from './components/load-button.js';
import {films, allFilters, createFilterTemplate} from './components/menu-nav.js';
import {createSortTemplate} from './components/menu-sort.js';
import {createFilmDetailsTemplate} from './components/popup.js';
import {createPersonalRatingTemplate} from './components/user.js';

const FILM_MAIN_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

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
const renderFilmsListExtra = (criterion) => {
  render(filmsElement, createFilmListExtraTemplate());
  let extraList = filmsElement.querySelector(`.films-list--extra:last-of-type`);
  let sortedFilmCards = films.slice()
                          .sort((a, b) => {
                            if (a[criterion] > b[criterion]) {
                              return -1;
                            }
                            if (a[criterion] < b[criterion]) {
                              return 1;
                            } else {
                              return 0;
                            }
                          });
  renderFilmCards(extraList, sortedFilmCards, FILM_EXTRA_COUNT);
};

renderFilmsListExtra(`rating`);
renderFilmsListExtra(`commentsCount`);

const commentedListExtra = filmsElement.querySelector(`.films-list--extra:last-of-type`);
commentedListExtra.querySelector(`.films-list__title`).textContent = `Most commented`;

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

// popup rendering
const popupFilmCard = films[getRandomNumber(0, films.length - 1, true)];
render(document.body, createFilmDetailsTemplate(popupFilmCard));

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
  const createCommentsMarkup = Array.from(popupFilmCard.comments).slice(0, popupFilmCard.commentsCount).map((comment) => {
    return createCommentTemplate(comment);
  }).join(`\n`);

  render(commentsContainer, createCommentsMarkup);
};

renderComments();
