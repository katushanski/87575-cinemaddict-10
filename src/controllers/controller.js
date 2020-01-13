import {render, remove} from '../utils/render.js';
import {isEscEvent, sortRandomArray} from '../util.js';
import CardElement from '../components/film-card.js';
import FilmsList from '../components/films-list.js';
import FilmsListExtra from '../components/films-list-extra.js';
import ShowMoreButton from '../components/load-button.js';
import Popup from '../components/popup.js';

// const siteMainElement = document.querySelector(`.main`); // надо убрать, оно есть в мейн

const FILM_MAIN_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

class PageController {
  constructor(container) {
    this._container = container;
  }

  render(films) {
    // main list movies rendering
    const filmsList = new FilmsList();
    render(this._container, filmsList.getElement());
    const filmsElement = filmsList.getElement();

    // rendering each card and corresponding popup as well as adding event listeners
    const renderFilmCards = (container, list, count) => {
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
    };

    renderFilmCards(filmsList.getContainer(), films, FILM_MAIN_COUNT);

    // extra list movies rendering
    const renderFilmsListExtra = (container, criterion, title) => {
      const extraSection = new FilmsListExtra(title);
      render(filmsElement, extraSection.getElement());
      let sortedFilmCards = sortRandomArray(films.slice(), criterion);
      renderFilmCards(extraSection.getContainer(), sortedFilmCards, FILM_EXTRA_COUNT);
    };

    const checkTopRated = (movies) => {
      let counter = 0;
      for (const film of movies) {
        if (film.rating > 0) {
          counter = counter + 1;
        }
      }
      return counter > 0;
    };

    const checkMostCommented = (movies) => {
      let counter = 0;
      for (const film of movies) {
        if (film.comments.length > 0) {
          counter = counter + 1;
        }
      }
      return counter > 0;
    };

    // cheking the neccessity of rendering extra blocks
    const renderFilmsExtraLists = (container, filmCards) => {
      const isTopRated = checkTopRated(filmCards);

      if (isTopRated) {
        renderFilmsListExtra(container, `rating`, `Top rated`);
      }
      const isMostCommented = checkMostCommented(filmCards);

      if (isMostCommented) {
        renderFilmsListExtra(container, `commentsCount`, `Most commented`);
      }
    };

    // "show more" button rendering
    if (films.length) {
      const showMoreButton = new ShowMoreButton();
      render(filmsList.getElement().querySelector(`.films-list`), showMoreButton.getElement());
      let showingFilmsCount = FILM_MAIN_COUNT;

      showMoreButton.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + FILM_MAIN_COUNT;

        films.slice(prevFilmsCount, showingFilmsCount)
          .forEach((film) => render(filmsList.getContainer(), new CardElement(film).getElement()));

        if (showingFilmsCount >= films.length) {
          remove(showMoreButton);
        }
      });
    } else {
      const filmsListTitle = filmsElement.querySelector(`.films-list__title`);

      filmsListTitle.classList.remove(`visually-hidden`);
      filmsListTitle.innerHTML = `There are no movies in our database`;
    }

    renderFilmsExtraLists(filmsList.getElement(), films);
  }
}

export default PageController;
