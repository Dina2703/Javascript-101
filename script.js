console.log("Hello");
//Type Conversions
//Implicity conversion  --- also known as type coercion where JS itself will automatically convert the type.
//Explicity conversion  --- where you manually convert the typ.

//Javascript automatically converts types in performing operations.
//+ will concatinate, when one of the operants is a string
console.log(2 + "3");
//- will do implicity conversion then does subtraction, when one of the operants is a string.
console.log("4" - 3);
//when try to subtract two strings, it gives 'NaN
console.log("Hi " - "Hello");
//true - false returns 1, because (1 - 0)
console.log(true - false);
//false - true returns -1, from (1 - 0)
console.log(false - true);
//5 - 1 = retuns 4
console.log("5" - true);
//5 - 0 = retuns 5
console.log("5" - false);
//null treated as 0(as well as false), so below returns 5
console.log("5" - null);
//returns 'NaN'
console.log("5" - undefined);

//Explicite conversion examples. Using global methods
//returns 5
console.log(Number("5"));
//returns 0
console.log(Number(""));
//returns 1
console.log(Number(true));
//returns 0
console.log(Number(false));
console.log(parseFloat("3.14"));
//String() global method converts all arguments into string
console.log(String(500));
console.log(String(true));
console.log(String(null));
//.toString() method does the same thing
console.log((500).toString());
//Boolean() global method returns true or false.
console.log(Boolean(100));
