const calculateSquare = require('../calculate-square.js');
const calculateSquarePromise = require('../calculate-square-promise.js');
const chai = require('chai');
const expect = chai.expect;

describe('calculateSquare using callback', () => {
  it('should calculate the square of 2', (done) => {
    calculateSquare(2, (error, result) => {
      expect(error).to.equal(null);
      expect(result).to.equal(4);
      // Mocha will wait until done is called before moving on
      done();
    });
  });

  it('should return an error if passed a string', (done) => {
    calculateSquare('2', (error, result) => {
      expect(error).to.not.equal(null);
      expect(error.message).to.equal('Argument of type number is expected');
      expect(result).to.equal(null);
      // Mocha will wait until done is called before moving on
      done();
    });
  });
});

describe('calculateSquare using promise', () => {
  it('should calculate the square of 2', (done) => {
    calculateSquarePromise(2).then((result) => {
      expect(result).to.equal(4);
      // Mocha will wait until done is called before moving on
      done();
    });
  });

  it('should return an error if passed a string', (done) => {
    calculateSquarePromise('2').catch((error) => {
      expect(error).to.not.equal(null);
      expect(error.message).to.equal('Argument of type number is expected');
      // Mocha will wait until done is called before moving on
      done();
    });
  });
});
