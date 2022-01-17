function calculateSquare(number, callback) {
  setTimeout(function () {
    let error;
    if (typeof number !== 'number') {
      // The try catch in the consuming function will be in the callstack
      // this code will exist in the message queue first
      // so to interact with the calling functions scope, you need to pass any errors to the callback.
      error = new Error('Argument of type number is expected');
    }

    if (error) {
      return callback(error, null);
    }
    const result = number * number;
    callback(null, result);
  }, 1000);
}

// Try catch does not work here because of the scoping of errors on the call stack vs message queue code
// It would work if the code was synchronous though
// try {
//   calculateSquare('forty two', (result) => {
//     console.log(result);
//   });
// } catch (error) {
//   console.log(`Caught error: ${String(error)}`);
// }

// const handler = (error, result) => {
//   if (error) {
//     console.log(`Caught error: ${String(error)}`);
//     return;
//   }
//   console.log(result);
// };

// This is the proper error handling
// calculateSquare('forty two', handler);

// calculateSquare(42, handler);
module.exports = calculateSquare;
