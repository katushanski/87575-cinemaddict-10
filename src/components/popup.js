import AbstractSmartComponent from './abstract-smart-component.js';
import CommentComponent from './comment.js';
import {render} from '../utils/render.js';
import {MAX_RATING} from '../mock/mock.js';

const createFilmRatingMarkup = (poster, title, userRating) => {
  let buttonListMarkup = ``;
  for (let index = 1; index <= MAX_RATING; index++) {
    buttonListMarkup +=
    `<input name="score" class="film-details__user-rating-input visually-hidden"
      id="rating-${index}" ${(index === userRating) ? `checked=""` : ``}
      type="radio" value="${index}"><label class="film-details__user-rating-label" for="rating-${index}">${index}</label>`;
  }

  return (
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>
        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img class="film-details__user-rating-img" alt="film-poster" src="./images/posters/${poster}">
          </div>
          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${title}</h3>
            <p class="film-details__user-rating-feelings">How you feel it?</p>
            <div class="film-details__user-rating-score">
              ${buttonListMarkup}
            </div>
          </section>
        </div>
      </section>
    </div>`
  );
};

/* const createEmojiMarkup = (emoji) => {
  let emojiMarkup = ``;
  switch (emoji) {
    case `emoji-smile`:
      emojiMarkup = `smile`;
      break;
    case `emoji-sleeping`:
      emojiMarkup = `sleeping`;
      break;
    case `emoji-gpuke`:
      emojiMarkup = `puke`;
      break;
    case `emoji-angry`:
      emojiMarkup = `angry`;
      break;
  }
  return (emojiMarkup) ? (
    `<img width="55" height="55" alt="emoji" src="images/emoji/${emojiMarkup}.png">`
  ) : ``;
}; */

const createPopupTemplate = (card) => {
  const {poster, title, rating, userRating, director, writers, country, actors, year, duration, genre, description, commentsCount, isInWatchlist, isWatched, isFavorite} = card;
  const userRatingBlock = (isWatched) ? createFilmRatingMarkup(poster, title, userRating) : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

              <p class="film-details__age">18+</p>
            </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${title}</p>
              </div>

              <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">30 March ${year}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    ${userRatingBlock}

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

        <ul class="film-details__comments-list">
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
          <label class="film-details__emoji-label" for="emoji-gpuke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>`
  );
};

class PopupComponent extends AbstractSmartComponent {
  constructor(film) {
    super(film);
    this._film = film;

    // handlers
    this._closeButtonClickHandler = null;
    this._watchlistButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoritesButtonClickHandler = null;

    this._emoji = null;

    // this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  renderComments(comments) {
    this._container = this.getElement().querySelector(`.film-details__comments-list`);
    this._comments = comments;
    const commentsListMarkup = this._comments.map((comment) => {
      return new CommentComponent(comment).getElement();
    });
    for (const comment of commentsListMarkup) {
      render(this._container, comment);
    }
  }

  onCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._closeButtonClickHandler = handler;
  }

  onWatchlistButtonClick(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  onWatchedButtonClick(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  onFavoritesButtonClick(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }

  /* recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;

        this.rerender();
      });

    element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._isRepeatingTask = !this._isRepeatingTask;

        this.rerender();
      });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }
  } */
}

export default PopupComponent;
