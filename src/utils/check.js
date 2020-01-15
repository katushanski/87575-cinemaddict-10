const isEscEvent = (evt) =>
  evt.key === `Escape` || evt.key === `Esc`;

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

export {isEscEvent, checkTopRated, checkMostCommented};
