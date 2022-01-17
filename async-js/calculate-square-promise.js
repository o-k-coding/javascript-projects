function calculateSquarePromise(number) {
  return new Promise((resolve, reject) => {
    let error;
    if (typeof number !== 'number') {
      // The try catch in the consuming function will be in the callstack
      // this code will exist in the message queue first
      // so to interact with the calling functions scope, you need to pass any errors to the callback.
      error = new Error('Argument of type number is expected');
    }

    if (error) {
      return reject(error);
    }
    const result = number * number;
    resolve(result);
  });
}

module.exports = calculateSquarePromise;
