'use strict';

/*
//Constructor function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do this - each of objects will create a copy of a functions
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};
Person.hey = function () {
  console.log('Hey there 👋');
};

const ivan = new Person('Ivan', 1996);

console.log(ivan);

// 1. New {} is created
// 2. Function is called {} = this
// 3. {} linked to a prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2006);
const jack = new Person('John', 1990);
console.log(ivan instanceof Person);

//Static method
Person.hey = function () {
  console.log('Hey there 👋');
};
Person.hey();
// Prototypes ////////////////////////////////
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
ivan.calcAge();

console.log(ivan.__proto__);
console.log(ivan.__proto__ === Person.prototype);
//Person prototype should be called prototypeOfLinkedObjects

// console.log(Person.prototype.isPrototypeOf(ivan));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiense';
console.log(ivan.species, matilda.species);

// console.log(ivan.hasOwnProperty('firstName'));
// console.log(ivan.hasOwnProperty('species'));

console.log(Person.prototype.__proto__);
// Object prototype top of prototype chain
console.log(ivan.__proto__.__proto__);
console.log(ivan.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 5, 6, 6, 6, 7];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

////////////////////////////////////////////////////////
//Challenge 1
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`The ${this.make} new speed ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 10;
  console.log(`The ${this.make} new speed ${this.speed} km/h`);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
bmw.accelerate();
bmw.accelerate();
mercedes.brake();
mercedes.brake();
*/

// class expression
//const PersonCl = class {}

/*
// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance method
  // Methods will be added to the prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property, which exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there 👋');
  }
}

const jessica = new PersonCl('Jessica Davies', 1990);
const walter = new PersonCl('Walter White', 1980);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
console.log(jessica.__proto__ === PersonCl.prototype);
// PersonCl.prototype.greet = function () {
//   console.log(`Hey, ${this.firstName}`);
// };

jessica.greet();

PersonCl.hey();
*/
///////////////////////Setters and Getters
const account = {
  owner: 'Jonas',
  movements: [200, 300, 400, 780],

  get latest() {
    return this.movements.at(-1);
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);

////////////////Object Create
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.firstName = 'Steven';
steven.birthYear = 1984;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1913);
sarah.calcAge();
*/
///////////////////////?Challenge2//////////////
/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`The ${this.make} new speed ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 10;
    console.log(`The ${this.make} new speed ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford);
console.log(ford.speedUS);
ford.speedUS = 100;
console.log(ford);
console.log(ford.speedUS);
ford.accelerate();
*/
/////////////////Inheritance between classes
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 1989, 'Computer Scie nce');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

/////////Challenge 3//////////////////////
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`The ${this.make} new speed ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 10;
  console.log(`The ${this.make} new speed ${this.speed} km/h`);
};

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going ${this.speed} km/h, with a charge of ${this.charge} %`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.accelerate();
tesla.chargeBattery(70);
tesla.accelerate();
*/

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there 👋');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first as it set this keyword
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm a ${2037 - this.birthYear}, but I feel like a ${
        2013 - this.birthYear + 25
      }`
    );
  }
}

const martha = new StudentCl('Martha Smith', 1999, 'Aviation');
console.log(martha);
martha.introduce();
martha.calcAge();

/////////////////////////// Inheritance between classes in Object Create
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (fullName, birthYear, course) {
  PersonProto.init.call(this, fullName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 1984, 'Meteorology');
jay.introduce();
jay.calcAge();
*/

// 1)Public fields
// 2) Private fields
// 3) Public mthods
// 4) Private methods
// There is a static version

class Account {
  // Classfields (new feature to implement in JS for defining classes) must be outside of any method
  // 1) Public fields (instances)
  locale = navigator.language;
  // 2) Private fields
  #movements = [];
  #pin; // define the variable
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //protected property
    // this._movements = [];
    // this.locale = navigator.language;
    //console.log(`Thanks for openning account, ${this.owner}`);
  }
  // 3) Public method
  //Public interface of object
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  requestLoan(val) {
    if (this._approveLoan) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  // 4) Private methods
  _approveLoan(val) {
    return true;
  }

  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
//Pubclic methods
acc1.deposit(150);
acc1.withdraw(350);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

//Private methods - user shouldn't have access to them
acc1.approveLoan;
acc1.pin;
console.log(acc1);

//console.log(acc1.#movements);
//console.log(acc1.#pin);

Account.helper();

// Chaining

acc1.deposit(200).deposit(555).withdraw(6000).requestLoan(1700);
console.log(acc1.getMovements());

///////////////// Challenge 4 /////////////////////////

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`The ${this.make} new speed ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 10;
    console.log(`The ${this.make} new speed ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} is going ${this.speed} km/h, with a charge of ${
        this.#charge
      } %`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
rivian.chargeBattery(90).accelerate().brake().brake().accelerate();
