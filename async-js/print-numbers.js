// This function sets the number to a variable and calls console.log in the function
function print1() {
  const number = 1;
  console.log(number);
}

// This function uses an anonymous function declared inside the function, basically a closure, just without any real state from the outer function scope
function print2() {
  function getNumber() {
    return 2;
  }

  const number = getNumber();
  console.log(number);
}

// This function uses a callback passed to the readFile function to log the number read from the file
// this one will be printed last no matter how quickly the file is read because of the way asynchronous callbacks are processed
// Basically all the synchronous code in the stack will be executed before
function print3() {
  const fs = require('fs');

  fs.readFile('./number3.txt', 'utf-8', function (err, number) {
    console.log(number);
  });
}

// This function sets the number to a variable and calls console.log in the function
function print4() {
  const number = 4;
  console.log(number);
}

// this function will be added to the stack
// inside, the console.log call will be added to the stack, then there is no more functions added, so they will pop off in that order
print1();
// this funciton will then be added to the stack
// inside the call to getNumber will be added and executed then popped off, then the call to console.log will be added then popped off (executed)
print2();
// this funciton will then be added to the stack
// inside the call to readFile will be executed...

print3();
// this function will be added to the stack
// inside, the console.log call will be added to the stack, then there is no more functions added, so they will pop off in that order
print4();
// At this point there are no function calls in the stack, so the event loop will check for async task completion only, when the readFile process is completed, the callback to readFile from fn 3
// will be added to the stack and popped off (executed)


// To get the correct order, call print4() in the callback of readFile in print3()
