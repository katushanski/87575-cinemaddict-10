import AbstractSmartComponent from './abstract-smart-component.js';

const createCardElementTemplate = (card) => {
  const {poster, title, rating, year, duration, genre, description, commentsCount, isInWatchlist, isWatched, isFavorite} = card;
  const activeCheck = (check) => check ? `film-card__controls-item--active` : ``;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${activeCheck(isInWatchlist)}}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${activeCheck(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${activeCheck(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

class CardComponent extends AbstractSmartComponent {
  constructor(card) {
    super(card);
    this._card = card;

    // properties
    this._isInWatchlist = card.isInWatchlist;
    this._isWatched = card.isWatched;
    this._isFavorite = card.isFavorite;

    // handlers
    this._closeButtonClickHandler = null;
    this._watchlistButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoritesButtonClickHandler = null;
  }

  getTemplate() {
    return createCardElementTemplate(this._card);
  }

  onWatchlistButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
    this.rerender();
  }

  onWatchedButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
    this.rerender();
  }

  onFavoritesButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
    this.rerender();
  }

  onInteractiveCardElementsClickHandler(handler) {
    // adding event listeners to card elements
    const cardTitle = this.getElement().querySelector(`.film-card__title`);
    const cardPoster = this.getElement().querySelector(`.film-card__poster`);
    const cardComments = this.getElement().querySelector(`.film-card__comments`);

    const interactiveCardElements = [cardTitle, cardPoster, cardComments];

    interactiveCardElements.forEach((element) => element.addEventListener(`click`, handler));
  }

  // setHandlers() {
  //   this.onWatchlistButtonClickHandler((evt) => {
  //     evt.preventDefault();
  //     this._isInWatchlist = !film.isInWatchlist;
  //     this.rerender();
  //   });

  //   this.onWatchedButtonClickHandler((evt) => {
  //     evt.preventDefault();
  //     this._isWatched = !film.isWatched;
  //     this.rerender();
  //   });

  //   this.onFavoritesButtonClickHandler((evt) => {
  //     evt.preventDefault();
  //     this._isFavorite = !film.isFavorite;
  //     this.rerender();
  //   });
  //
  //   this.onInteractiveCardElementsClickHandler((evt) => {
  //     ??????????????? Как мне перенести сюда setHandlers из movie.js, ведь нужно использовать showPopup и onDataChange
  //   });
  // }

  rerender() {
    super.rerender();
  }
}

export default CardComponent;
