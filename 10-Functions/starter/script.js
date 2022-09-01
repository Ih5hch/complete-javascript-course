'use strict';

/*
const createBooking = function (
  flightNum,
  numPassengers = 10,
  price = 199 * numPassengers
) {
  //ES5
  // numPassengers ||= 10;
  // price ||= 299;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
};

createBooking('LH513');
createBooking('LH123', 23, 299);
*/

// const oneWord = function (str) {
//   return str.replaceAll(' ', '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

//Higher order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by ${fn.name}`);
// };

// transformer('javascript is the best', upperFirstWord);
// transformer('javascript is the best', oneWord);

// const greet = greeting => {
//   return name => {
//     console.log(`${greeting}, ${name}`);
//   };
// };

//greet('Hey')('Mey');

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
//   },
// };

// lufthansa.book(439, 'John Smith');
// console.log(lufthansa.bookings);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const swiss = {
//   airline: 'Swiss Airlines',
//   iataCode: 'SX',
//   bookings: [],
// };

// const book = lufthansa.book;
// const bookEw = book.bind(eurowings);
// const bookSx = book.bind(swiss);
// const bookEw23 = book.bind(eurowings, 23);
// book.call(eurowings, 23, 'Sarah Connor');
// book.call(swiss, 234, 'John Stones');
// console.log(eurowings);
// console.log(swiss);
// bookEw(23, 'Fred Malcolm');
// bookEw(45, 'John Macintosh');
// bookSx(1233, 'Ivan Kovalenko');
// bookEw23('Adam Sandler');
// console.log(eurowings);
// console.log(swiss);

// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes += 1;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //inside buttom this refers to DOM element

//Partial application

// const addTax = (rate, value) => value + value * rate;
// const addVat = addTax.bind(null, 0.23);
// console.log(addVat(234));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    }
    if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(',')}`);
    }
  },
};

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

const runOnce = function () {
  console.log('This will run once');
};
runOnce(); //function is assigned to a variable,so it could be called dmany times

//Immediately invoked function function expression (IIFE)
(() => {
  console.log('This will run once');
})();

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    console.log(`${(passengerCount += 1)} passengers`);
  };
};

const booker = secureBooking();
// booker();
// booker();
// booker();

let f;
const g = () => {
  const a = 23;
  f = () => {
    console.log(a * 2);
  };
};

//Example 1
const h = () => {
  const b = 777;
  f = () => {
    console.log(b * 2);
  };
};

g();
f();

//Re - assigning
h();
f();

//Example 2
const boardPassenger = function (n, wait) {
  const group = n / 3;

  setTimeout(function () {
    console.log(`We are boarding all ${n} passengers`);
    console.log(`There are groups ${group} passenger each`);
  }, wait * 1000);

  console.log(`We start boarding in ${wait} seconds`);
};

boardPassenger(180, 3);

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
