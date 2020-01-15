/*
random values functions
*/

const getRandomNumber = function (min, max, toRound, numbersLengthAfterPoint) {
  const number = Math.random() * (max - min) + min;
  return toRound ? Math.round(number) : number.toFixed(numbersLengthAfterPoint);
};

const getRandomIndex = (list) =>
  list[Math.floor(Math.random() * Math.floor(list.length - 1))];

const getRandomBoolean = () =>
  Math.random() < 0.5;

const getCountByProperty = (movies, property) =>
  movies.filter((film) => film[property]).length;

/*
sorting
*/

const sortRandomArray = (list, criterion) => {
  return list.sort((a, b) => {
    if (a[criterion] > b[criterion]) {
      return -1;
    }
    if (a[criterion] < b[criterion]) {
      return 1;
    } else {
      return 0;
    }
  });
};

export {
  getRandomNumber,
  getRandomIndex,
  getRandomBoolean,
  getCountByProperty,
  sortRandomArray
};
