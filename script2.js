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
