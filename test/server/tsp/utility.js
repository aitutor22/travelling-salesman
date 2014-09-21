'use strict';

var Utility = require('../../../lib/controllers/utility'),
  _ = require('lodash'),
  should = require('should');

var testArr;
  
describe('replace function', function() {
  beforeEach(function() {
    testArr = [0, 1, 2, 3, 4];
  });

  it('should return an array', function() {
    (Utility.replace(testArr, 0, 1) instanceof Array).should.be.true;
  });

  it('should replace an element with target value', function() {;
    _.isEqual(Utility.replace(testArr, 2, 3), [0, 1, 3, 3, 4]).should.be.true;
  });

  it('should not make any replacement if target value is not present', function() {
    _.isEqual(Utility.replace(testArr, 5, 3), [0, 1, 2, 3, 4]).should.be.true;
  });
  
  it('should not modify the array passed in', function() {
    Utility.replace(testArr, 2, 3);
    _.isEqual(testArr, [0, 1, 2, 3, 4]).should.be.true;
  });
});