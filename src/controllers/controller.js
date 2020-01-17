import {isEscEvent, checkTopRated, checkMostCommented} from '../utils/check.js';
import {render, remove} from '../utils/render.js';
import {sortRandomArray} from '../utils/random.js';
import CardElement from '../components/film-card.js';
import FilmsList from '../components/films-list.js';
import FilmsListExtra from '../components/films-list-extra.js';
import ShowMoreButton from '../components/load-button.js';
import SortComponent, {SortType} from '../components/menu-sort.js';
import Popup from '../components/popup.js';

const FILM_MAIN_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

class PageController {
  constructor(container) {
    this._container = container;
    this._filmsList = new FilmsList();
    this._showMoreButton = new ShowMoreButton();
    this._sortComponent = new SortComponent();
  }

  render(films) {
    const sortComponent = this._sortComponent;
    render(this._container, sortComponent);

    sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedFilms = [];
      switch (sortType) {
        case SortType.DEFAULT:
          sortedFilms = films.slice(0);
          break;
        case SortType.DATE:
          sortedFilms = films.slice(0).sort((a, b) => b.date - a.date);
          break;
        case SortType.RATING:
          sortedFilms = films.slice(0).sort((a, b) => b.rating - a.rating);
          break;
      }

      // здесь в учебном проекте написано taskListElement.innerHTML = ``; но я не понимаю смысл этого. Зачем здесь удалять содержимое списка с фильмами?
      remove(this._showMoreButton);
      this.renderFilmCards(this._container, sortedFilms);
    });

    // main list movies rendering
    const filmsElement = this._filmsList.getElement();
    render(this._container, filmsElement);

    // rendering each card and corresponding popup as well as adding event listeners
    this.renderFilmCards(this._filmsList.getContainer(), films, FILM_MAIN_COUNT);

    // "show more" button rendering
    if (films.length) {

      render(this._filmsList.getElement().querySelector(`.films-list`), this._showMoreButton.getElement());
      let showingFilmsCount = FILM_MAIN_COUNT;

      this._showMoreButton.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + FILM_MAIN_COUNT;

        films.slice(prevFilmsCount, showingFilmsCount)
          .forEach((film) => render(this._filmsList.getContainer(), new CardElement(film).getElement()));

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButton);
        }
      });
    } else {
      const filmsListTitle = filmsElement.querySelector(`.films-list__title`);
      filmsListTitle.classList.remove(`visually-hidden`);
      filmsListTitle.innerHTML = `There are no movies in our database`;
    }

    this.renderFilmsExtraLists(this._filmsList.getElement(), films);
  }

  // rendering each card and corresponding popup as well as adding event listeners
  renderFilmCards(container, list, count) {
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
        popup.setCloseButtonClickHandler(closePopup);
        document.addEventListener(`keydown`, onPopupEscPress);
      };

      const closePopup = () => {
        remove(popup);
      };

      const onPopupEscPress = (evt) => {
        if (isEscEvent(evt)) {
          closePopup();
        }
      };

      const interactiveCardElements = [cardTitle, cardPoster, cardComments];

      interactiveCardElements.forEach((element) => { // Могу ли я оставить здесь слушатель события?
        element.addEventListener(`click`, showPopup);
      });
    });
  }

  // extra list movies rendering
  renderFilmsListExtra(container, films, criterion, title) {
    const extraSection = new FilmsListExtra(title);
    render(container, extraSection.getElement());
    let sortedFilmCards = sortRandomArray(films.slice(), criterion);
    this.renderFilmCards(extraSection.getContainer(), sortedFilmCards, FILM_EXTRA_COUNT);
  }

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
}

export default PageController;