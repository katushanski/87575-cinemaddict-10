import {isEscEvent} from '../utils/check.js';
import {render, remove} from '../utils/render.js';
import CardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
/*
const Mode = {
DEFAULT: `default`,
POPUP: `details`,
}; */

export default class MovieController {
  constructor(container, onDataChange) { // , onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    /* this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT; */

    this._filmCardComponent = null;
    this._popupComponent = null;

    this.onPopupEscPress = this.onPopupEscPress.bind(this);
  }

  render(film) {
    // rendering one card and corresponding popup as well as adding event listeners

    this._filmCardComponent = new CardComponent(film);
    this._popupComponent = new PopupComponent(film);

    render(this._container, this._filmCardComponent.getElement());

    // adding event listeners to card elements
    const cardTitle = this._filmCardComponent.getElement().querySelector(`.film-card__title`);
    const cardPoster = this._filmCardComponent.getElement().querySelector(`.film-card__poster`);
    const cardComments = this._filmCardComponent.getElement().querySelector(`.film-card__comments`);

    const interactiveCardElements = [cardTitle, cardPoster, cardComments];

    interactiveCardElements.forEach((element) => {
      element.addEventListener(`click`, this.showPopup(film));
    });

    // adding event listeners to card buttons
    this._filmCardComponent.onWatchlistButtonClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._filmCardComponent.onWatchedButtonClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCardComponent.onFavoritesButtonClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    // adding event listeners to popup buttons
    this._popupComponent.onWatchlistButtonClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._popupComponent.onWatchedButtonClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._popupComponent.onFavoritesButtonClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });
  }

  rerender(film) {
    const oldFilmCardElement = this._filmCardComponent.getElement();
    const oldPopupElement = this._popupComponent.getElement();

    const cardParent = oldFilmCardElement.parentElement;
    const popupParent = oldPopupElement.parentElement;

    /* oldFilmCardElement.removeElement();
    oldPopupElement.removeElement(); */

    const newFilmCardElement = new CardComponent(film).getElement();
    const newPopupElement = new PopupComponent(film).getElement();

    cardParent.replaceChild(newFilmCardElement, oldFilmCardElement);
    popupParent.replaceChild(newPopupElement, oldPopupElement);
  }

  showPopup(film) {
    this._popupComponent.renderComments(film.comments);
    render(document.body, this._popupComponent.getElement());
    this._popupComponent.onCloseButtonClickHandler(this.closePopup());
    document.addEventListener(`keydown`, this.onPopupEscPress);
  }

  closePopup() {
    remove(this._popupComponent);
  }

  onPopupEscPress(evt) {
    if (isEscEvent(evt)) {
      this.closePopup();
    }
  }
}
