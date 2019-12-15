const getRandomNumber = function (min, max, toRound, numbersLengthAfterPoint) {
  const number = Math.random() * (max - min) + min;
  return toRound ? Math.round(number) : number.toFixed(numbersLengthAfterPoint);
};

const getRandomIndex = (array) =>
  array[Math.floor(Math.random() * Math.floor(array.length - 1))];

const getRandomBoolean = () =>
  Math.random() < 0.5;

export {getRandomNumber, getRandomIndex, getRandomBoolean};
