import {isEscEvent} from '../utils/check.js';
import {render, remove, replace} from '../utils/render.js';
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

    // this._onKeyDown = this._onKeyDown.bind(this);
  }

  render(film) {
    // rendering one card and corresponding popup as well as adding event listeners
    const oldFilmCardComponent = this._filmCardComponent;
    const oldPopupComponent = this._popupComponent;
    this._filmCardComponent = new CardComponent(film);
    this._popupComponent = new PopupComponent(film);

    render(this._container, this._filmCardComponent.getElement());

    const showPopup = () => {
      this._popupComponent.renderComments(film.comments);
      render(document.body, this._popupComponent.getElement());
      this._popupComponent.onCloseButtonClickHandler(closePopup);
      document.addEventListener(`keydown`, onPopupEscPress);
    };

    const closePopup = () => {
      remove(this._popupComponent);
    };

    const onPopupEscPress = (evt) => {
      if (isEscEvent(evt)) {
        closePopup();
      }
    };

    // adding event listeners to card elements
    const cardTitle = this._filmCardComponent.getElement().querySelector(`.film-card__title`);
    const cardPoster = this._filmCardComponent.getElement().querySelector(`.film-card__poster`);
    const cardComments = this._filmCardComponent.getElement().querySelector(`.film-card__comments`);

    const interactiveCardElements = [cardTitle, cardPoster, cardComments];

    interactiveCardElements.forEach((element) => {
      element.addEventListener(`click`, showPopup);
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

    if (oldFilmCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._filmCardComponent.getElement());
    }
  }
}
