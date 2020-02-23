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

    this._film = {};

    // compnents
    this._filmCardComponent = null;
    this._popupComponent = null;

    // methods
    this.onPopupEscPress = this.onPopupEscPress.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  render(film) {
    this._film = film;

    // rendering one card and corresponding popup as well as adding event listeners
    this._filmCardComponent = new CardComponent(film);
    this._popupComponent = new PopupComponent(film);

    render(this._container, this._filmCardComponent.getElement());
    this.setFilmCardHandlers(film);
  }

  rerender(film) {
    this._film = film;

    if (this._filmCardComponent) {
      this._filmCardComponent.rerender(film);
    }

    if (this._popupComponent) {
      this._popupComponent.rerender(film);
    }

    this.setFilmCardHandlers(film);
  }

  setFilmCardHandlers(film) {
    this._film = film;

    // adding event listeners to card interactive elements
    this._filmCardComponent.onInteractiveCardElementsClickHandler(this.showPopup);

    this._filmCardComponent.onWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._filmCardComponent.onWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCardComponent.onFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    // adding event listeners to popup buttons
    this._popupComponent.onCloseButtonClickHandler(this.closePopup);

    this._popupComponent.onWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._popupComponent.onWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._popupComponent.onFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });
  }

  showPopup() {
    this._popupComponent = new PopupComponent(this._film);
    this._popupComponent.renderComments(this._film.comments);
    render(document.body, this._popupComponent.getElement());
    this._popupComponent.onCloseButtonClickHandler(this.closePopup);
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
