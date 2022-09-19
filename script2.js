//Nested function scope
let a = 10;

function outer() {
  let b = 20;
  function inner() {
    let c = 30;
    console.log(a, b, c);
  }
  inner();
}
outer();

//Closure
function outerFunc() {
  let counter = 0;
  function innerFunc() {
    counter++;
    console.log(counter);
  }
  innerFunc(); //calling the inner function
}
outerFunc();
outerFunc(); // each time gives the same value.

function outerFunc2() {
  let counter = 0;
  function innerFunc2() {
    counter++;
    console.log(counter);
  }
  return innerFunc2; //returning the value of inner function
}
const fn = outerFunc2(); //assign the returned value into fn variable.
// closure is created when a function is returned from another function. fn function remembers that the counter previous value.
fn();
fn();
fn(); // each time gives different value

//Function Currying

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(2, 5, 8));
//in JS sum(2, 5, 8) transforms to  sum(2)(5)(8) one argument at a time. ///Another example for curring function:
const buildSandwich = (ingred1) => (ingred2) => (ingred3) =>
  `My sandwich made of ${ingred1}, ${ingred2}, ${ingred3} `;
const mySandwish = buildSandwich("turkey")("cheese")("bread");
console.log(mySandwish);
//another example of a curries function:
const multiply = (x, y) => x * y;
const curriedMultiply = (x) => (y) => x * y; //nested functions, each takes in one parameter.
console.log(multiply(2, 3)); //we get '6'
console.log(curriedMultiply(2)); // we get '(y) => x * y' , since we still need to pass one for parameter for 'y' variable, like:
console.log(curriedMultiply(2)(6)); // now we get 12

//Partially applied functions are a common use of currying
const timesTen = curriedMultiply(10); //we can pass in the first parameter, so it's partially applied, it doesn't give us a vianl value, it's still a uncompleted function that needs one more parameter to be completed,  and any time I want to call 'timesTen func' i just pass in the second parameter.
//Another example:
const updateElemText = (id) => (content) =>
  (document.querySelector(`#${id}`).textContent = content);
const updateHeaderText = updateElemText("header");
updateHeaderText("Hello World");

//Another common use of currying is function composition
//Allows calling small functions in a specific order.

const addCustomer =
  (fn) =>
  (...args) => {
    console.log("saving customer info...");
    return fn(...args);
  };

const processOrder =
  (fn) =>
  (...args) => {
    console.log(`processing order #${args[0]}`);
    return fn(...args);
  };

let completeOrder = (...args) => {
  console.log(`Order #${[...args].toString()} completed`);
};

completeOrder = processOrder(completeOrder); //here it get only one parameter, for 'fn' parameter;
console.log(completeOrder);
completeOrder = addCustomer(completeOrder);
console.log(completeOrder);
completeOrder("1000"); //finally the function get the second argument, that passes through the chain of function, and can be completed.
//the function above does't complete until it receives the second parameter. Usually we see nested functions like this:
function addCustomer2(...args) {
  return function processOrder(...args) {
    return function completeOrder(...args) {
      //end
    };
  };
}
//the 'completeOrder' is the last function and then we climb up to process order and finally up to addCustomer2. So when we applied them above we had to start from the inside and work our way out to the top.

//'this' keyword

// Implicit binding. The implicit binding rule states that when a function is invoked with the dot notation, the object to the left of the dot is what 'this' keyword is referencing.
const person = {
  name: "Anna",
  sayMyName: function () {
    console.log(`My name is ${this.name}`);
  },
};
//Javascript will now treat 'this.name' as 'person.name'
person.sayMyName();

//Explicit binding.
//This time the function is separated from the 'person' object.
//In this scenarion we have to explicity specify the context when the function is called, to do so we can use the 'call' method. 'Call' is a build-in method which allows you to specify the context with which a function is invoked.

function sayMyName() {
  console.log(`My name is ${this.name}.Called from separated function.`);
}
//use call(), passing in the object name to specify what 'this' keyword referencing.
sayMyName.call(person);

//New binding rule - The third rule for determinig 'this' in a function is the 'new' binding. In Javascript we can invoked the function with the 'new' keyword. The functions is invoked with this keyword referencing an empty object.

//below known as a constructor functionas we create multiple persons from this function.
function Person(name) {
  //this = {} , 'this' is equal to an empty object.
  // You can then add properties to the object using 'this' followed by the dot notation.
  this.name = name;
}

const p1 = new Person("Sam"); //when the function is invoked with the 'new' keyword within the function 'this' keyword will always reference a new  empty object.
const p2 = new Person("John");

console.log(p1.name, p2.name);

//Default binding  - when none of the other rules are matched. 'This' keyword will rely on the global scope.
//When there is no dot notation, no call() method or no 'new' as well, if we simply invoke the function sayMyName() and none of the 3 rules are satisfied Javascript will default to the global scope and set 'this' keyword to the global object. In the global scope JS will try to find a variable called 'name', since it doesn't find it 'this' dot name is undefined, in or case we defined - 'globalThis.name = "Superman";

sayMyName();
globalThis.name = "Superman";

//Prototype
function User(fName, lName) {
  this.firstName = fName;
  this.lastName = lName;
}

//now we create instances of this 'User' function using the 'new keyword.

const user1 = new User("Sam", "Shown");
const user2 = new User("Kate", "Soi");

//Since the javacript is dynamic language we can attach any property to the object any time.
User.prototype.getFullName = function () {
  return "My full name is " + this.firstName + " " + this.lastName;
};
//the getFullName() is specific to just user1 object, user2 doesn't have it
console.log(user1.getFullName());
// console.log(user2.getFullName()); will give us an error.

//If we want to attach a method to every instance of the  'User' function. This is where 'PROTOTYPE' comes in.
//In javacsript every function has a property called 'prototype' that points to an object. To determine all our shareable properies we can use this 'prototype' property.
console.log(user1.getFullName());
console.log(user2.getFullName()); //know we can call getFullName() from any instance of the 'User' object

//Prototype Inheritance

function SuperHero(fName, lName) {
  //this = {}
  User.call(this, fName, lName); //to inherite fName, lName and this from User object.
  this.isSuperHero = true;
}

SuperHero.prototype.fightCrime = function () {
  console.log("Fighting crime");
};
SuperHero.prototype = Object.create(User.prototype); //what this deos is when you try to access patman.getFullName() javascript checks the prototype object of superhero ot doesn't find it however it sees that the prototype object has a chain to User.prototype created because by Object.create, so it checks to see if User.prototype has a getFullName(), it does and it will execute that method. this is HOW THE METHOD IS INHERITED THROUGHT THE PROPOTYPE CHAIN.

const batman = new SuperHero("Bruce", "Wayn");
//know batman has only access to isSuperHero and fightCrime from SuperHero object.
//but we want also have 'firstName' and 'lastName' props from User object. We need to inherite them.
console.log("Prototype inheritance: " + batman.getFullName());
SuperHero.prototype.constructor = SuperHero; //add this line, otherwise JS thinks that Superhero object created from User which is not. Superhero has inherited properties and methods from User.

//Class  -- example shows how we can transform User object create using class keyword. First create a class and initialize properties, then add methods on it.
class User2 {
  constructor(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
  }
  //all the methods on the prototype object are rewritten as methods within the class
  sayMyName2() {
    return this.firstName + " " + this.lastName;
  }
}

const class1 = new User2("Zhan", "Khvan");
console.log("with class: " + class1.sayMyName2());
console.log(class1.firstName);

//Lets know rewrite Superhero which inherits from User, we have to user 2 keyword 'extends' and 'super' to inherite methods and props from other object.
class SuperHero2 extends User2 {
  constructor(fName, lName) {
    super(fName, lName); //to inherite props and methods from User2 object, instead of the User.call(this, fName, lName);
    this.isSuperHero = true;
  }
  fightCrime() {
    console.log("Fighting crime");
  }
}

const superman = new SuperHero2("Clark", "Kent");
console.log(superman);
console.log(superman.sayMyName2());
