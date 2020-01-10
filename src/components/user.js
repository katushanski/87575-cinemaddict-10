import {createElement} from '../util.js';

const createPersonalRatingTemplate = (personalRating) => {
  const getPersonalRating = (rating) => {
    if (rating === 0) {
      return ``;
    } else if (rating >= 1 && rating <= 10) {
      return `Novice`;
    } else if (rating >= 11 && rating < 20) {
      return `Fan`;
    } else {
      return `Movie buff`;
    }
  };

  return `<section class="header__profile profile">
    <p class="profile__rating">${getPersonalRating(personalRating)}</p>
    <img class="profile__avatar" src="./images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

class PersonalRating {
  constructor(personalRating) {
    this._element = null;
    this._rating = personalRating;
  }

  getTemplate() {
    return createPersonalRatingTemplate(this._rating);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default PersonalRating;
