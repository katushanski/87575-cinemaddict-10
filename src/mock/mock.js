import {getRandomNumber, getRandomIndex, getRandomBoolean} from '../utils/random.js';

const GENRES = [
  `Musical`,
  `Cartoon`,
  `Western`,
  `Drama`,
  `Horror`,
  `Comedy`,
  `Melodrama`,
  `Action`,
  `Thriller`
];

const TITLES = [
  `Titanic`,
  `Fast and Furious`,
  `The Shining`,
  `Inception`,
  `Fear and loathing in las vegas`,
  `Batman vs Superman`,
  `Spider-Man: Far from Home`,
  `Toy Story 4`, `Interstellar`,
  `Avengers: Endgame`,
  `It`,
  `Star Wars: The Force Awakens`,
  `Jurassic World`,
  `Mad Max`,
  `Leon`,
  `Deadpool`,
  `Fight Club`
];

const NAMES = [
  `Morgan Freeman`,
  `Leonardo DiCaprio`,
  `Brad Pitt`,
  `Michael Caine`,
  `Robert De Niro`,
  `Matt Damon`,
  `Tom Hanks`,
  `Christian Bale`
];

const COUNTRIES = [
  `USA`,
  `Russia`,
  `France`,
  `Germany`,
  `Spain`,
  `UK`
];

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const MAX_DESCRIPTION_LENGTH = 140;

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const EMOJIES = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`,
  `trophy.png`
];

const getRandomDescription = (array, size) => {
  let randomComment = [];
  while (randomComment.length < size) {
    const item = getRandomIndex(array);
    randomComment.push(item);
  }
  return randomComment.join(`. `);
};

const createFilmDescription = () => {
  let sentences = DESCRIPTION.split(`. `);
  return getRandomDescription(sentences, getRandomNumber(1, 3, true));
};

const limitDescription = (string, number, symbol) => {
  if (!number && !symbol) {
    return string;
  } else if (string.length > number) {
    return string.substr(0, number - symbol.length) + symbol;
  } else {
    return string;
  }
};

const generateFilmCard = (titles, index) => {
  const today = new Date();
  const year = getRandomNumber(1980, today.getFullYear(), true);
  const commentsCount = getRandomNumber(0, 10, true);
  const getComments = (count) => {
    return new Array(count)
                .fill(``)
                .map(() => {
                  return {
                    text: getRandomIndex(DESCRIPTION.split(`. `)),
                    emoji: getRandomIndex(EMOJIES),
                    author: `John Doe`,
                    day: `Today`// мне нужно сюда еще добавить два свойства, которые будут содержать имя и дату?
                  };
                });
  };
  return {
    poster: `${getRandomIndex(POSTERS)}`,
    title: titles[index],
    rating: Math.round(Math.random() * 100) / 10,
    director: getRandomIndex(NAMES),
    writers: getRandomIndex(NAMES),
    actors: getRandomIndex(NAMES),
    country: getRandomIndex(COUNTRIES),
    year,
    duration: `${getRandomNumber(1, 3, true)}h ${getRandomNumber(0, 60, true)}m`,
    genre: getRandomIndex(GENRES),
    description: limitDescription(createFilmDescription(), MAX_DESCRIPTION_LENGTH, `...`),
    commentsCount,
    comments: getComments(commentsCount),
    isInWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean()
  };
};

const generateFilmCards = (amount) => {
  return new Array(amount)
          .fill(``)
          .map((it, index) => {
            return generateFilmCard(TITLES, index);
          });
};

export {generateFilmCards};
