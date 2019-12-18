const getRandomNumber = function (min, max, toRound, numbersLengthAfterPoint) {
  const number = Math.random() * (max - min) + min;
  return toRound ? Math.round(number) : number.toFixed(numbersLengthAfterPoint);
};

const getRandomIndex = (array) =>
  array[Math.floor(Math.random() * Math.floor(array.length - 1))];

const getRandomBoolean = () =>
  Math.random() < 0.5;

const sortRandomArray = (array, criterion) => {
  return array.sort((a, b) => {
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

const getCountByProperty = (movies, property) =>
  movies.filter((film) => film[property]).length;

export {getRandomNumber, getRandomIndex, getRandomBoolean, sortRandomArray, getCountByProperty};
