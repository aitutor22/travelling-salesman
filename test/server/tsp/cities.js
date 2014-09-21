'use strict';

var Cities = require('../../../lib/controllers/cities'),
  _ = require('lodash'),
  should = require('should'),
  cities;
  
var testData = [ { name: 'Orgrimmar', xPos: 50, yPos: 50 },
  { name: 'Stormwind', xPos: 300, yPos: 20 },
  { name: 'Darnassus', xPos: 550, yPos: 50 },
  { name: 'Ironforge', xPos: 900, yPos: 500 },
  { name: 'Silvermoon', xPos: 650, yPos: 450 },
  { name: 'Undercity', xPos: 350, yPos: 250 },
  { name: 'Thunder Bluff', xPos: 550, yPos: 400 } ];



describe('initialising', function() {

  beforeEach(function() {
    cities = Cities(testData);
  });

  it('should return an object', function() {
    (typeof cities).should.equal('object');
  });

});

describe('calculateTotalDistance', function() {
  beforeEach(function() {
    cities = Cities(testData);
  });

  it('should be defined', function() {
    cities.hasOwnProperty('calculateTotalDistance').should.be.true;
    (typeof cities.calculateTotalDistance).should.equal('function');
  });  

  it('should throw error if an array is not passed in', function() {
    (function() {
      cities.calculateTotalDistance()  
    }).should.throw('invalid arguments');

    (function() {
      cities.calculateTotalDistance(123)  
    }).should.throw('invalid arguments'); 

    (function() {
      cities.calculateTotalDistance('123')  
    }).should.throw('invalid arguments'); 
  });  

  it('test case', function() {
    cities.calculateTotalDistance([0, 1, 2, 3, 4, 5, 6]).should.equal(1081800);
    cities.calculateTotalDistance([3, 1, 2, 0, 4, 6, 5]).should.equal(1863800);
  })
});


