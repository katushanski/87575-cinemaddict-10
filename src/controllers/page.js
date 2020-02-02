import {checkTopRated, checkMostCommented} from '../utils/check.js';
import {render, remove} from '../utils/render.js';
import {sortRandomArray} from '../utils/random.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsExtraListComponent from '../components/films-list-extra.js';
import ShowMoreButtonComponent from '../components/load-button.js';
import SortComponent, {SortType} from '../components/menu-sort.js';
import MovieController from './movie.js';

const FILM_MAIN_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

class PageController {
  constructor(container) {
    this._container = container;

    // components
    this._filmsList = new FilmsListComponent();
    this._filmsListContainer = this._filmsList.getContainer();
    this._showMoreButton = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    // я не знаю как это назвать, это же не components
    this._onDataChange = this._onDataChange.bind(this);
  }

  render(films) {
    this._films = films;

    // sorting films list
    const sortComponent = this._sortComponent;
    render(this._container, sortComponent.getElement());

    let showingFilmsCount = FILM_MAIN_COUNT;
    sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedFilms = [];
      switch (sortType) {
        case SortType.DEFAULT:
          sortedFilms = this._films.slice();
          break;
        case SortType.DATE:
          sortedFilms = this._films.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          sortedFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
          break;
      }

      showingFilmsCount = FILM_MAIN_COUNT;

      // additional function for clearing cards list before rendering sorted films
      this._filmsListContainer.innerHTML = ``;
      this.renderFilmCards(this._filmsListContainer, sortedFilms, showingFilmsCount);
      renderShowMoreButton(sortedFilms);
    });

    // rendering main list including container
    const filmsElement = this._filmsList.getElement();
    render(this._container, filmsElement);

    // rendering each card in the main list and corresponding popup as well as adding event listeners
    this.renderFilmCards(this._filmsList.getContainer(), this._films, FILM_MAIN_COUNT);

    // rendering "show more" button
    const renderShowMoreButton = (allFilms) => {
      if (allFilms.length) {
        remove(this._showMoreButton);
        render(this._filmsList.getElement().querySelector(`.films-list`), this._showMoreButton.getElement());

        this._showMoreButton.setClickHandler(() => {
          const prevFilmsCount = showingFilmsCount;
          showingFilmsCount = showingFilmsCount + FILM_MAIN_COUNT;

          const newShowMoreList = allFilms.slice(prevFilmsCount, showingFilmsCount);
          this.renderFilmCards(this._filmsList.getContainer(), newShowMoreList, showingFilmsCount);

          if (showingFilmsCount >= allFilms.length) {
            remove(this._showMoreButton);
          }
        });
      } else {
        const filmsListTitle = filmsElement.querySelector(`.films-list__title`);
        filmsListTitle.classList.remove(`visually-hidden`);
        filmsListTitle.innerHTML = `There are no movies in our database`;
      }
    };

    renderShowMoreButton(this._films);

    this.renderFilmsExtraLists(this._filmsList.getElement(), this._films);
  }

  // rendering each card and corresponding popup as well as adding event listeners
  renderFilmCards(container, list, count) {
    list.slice(0, count).forEach((film) => {
      const movieController = new MovieController(container, this._onDataChange);
      movieController.render(film);
    });
  }

  // extra list movies rendering
  renderFilmsListExtra(container, films, criterion, title) {
    const extraSection = new FilmsExtraListComponent(title);
    render(container, extraSection.getElement());
    let sortedFilmCards = sortRandomArray(films.slice(), criterion);
    this.renderFilmCards(extraSection.getContainer(), sortedFilmCards, FILM_EXTRA_COUNT);
  }

  // rendering extra lists
  renderFilmsExtraLists(container, filmCards) {
    const isTopRated = checkTopRated(filmCards);
    if (isTopRated) {
      this.renderFilmsListExtra(container, filmCards, `rating`, `Top rated`);
    }

    const isMostCommented = checkMostCommented(filmCards);
    if (isMostCommented) {
      this.renderFilmsListExtra(container, filmCards, `commentsCount`, `Most commented`);
    }
  }

  _onDataChange(movieController, oldData, newData) { // почему вообще стоит передавать moviecontroller в параметры? почему нельзя просто дать на него ссылку в теле функции?
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.rerender(this._films[index]);
  }
}

export default PageController;
