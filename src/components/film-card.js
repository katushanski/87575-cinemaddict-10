import AbstractComponent from './abstract-component.js';

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

class CardElement extends AbstractComponent {
  constructor(card) {
    super(card);
    this._card = card;
  }

  getTemplate() {
    return createCardElementTemplate(this._card);
  }
}

export default CardElement;
