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
//in JS sum(2, 5, 8) transforms to  sum(2)(5)(8) one argument at a time
