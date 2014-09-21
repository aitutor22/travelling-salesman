'use strict';

var _ = require('lodash');

function Cities(data) {
  var citiesData = data,
    //we want to cache distances between cities so we only need to calculate once
    distancesMap = {};

  function calculateDistanceBetweenTwoCities(cityAIndex, cityBIndex) {
    //error checking
    if (typeof cityAIndex !== 'number' || typeof cityBIndex !== 'number') throw new Error('invalid arguments');
    if (cityAIndex < 0 || cityBIndex < 0 || cityAIndex >= citiesData.length || cityBIndex >= citiesData.length) {
      throw new Error('invalid arguments');
    };
    if (cityAIndex === cityBIndex) throw new Error('invalid arguments');

    //don't square root to save computation time
    return Math.pow((citiesData[cityAIndex].xPos - citiesData[cityBIndex].xPos), 2) 
      + Math.pow((citiesData[cityAIndex].yPos - citiesData[cityBIndex].yPos), 2);
  }; //end calculateDistanceBetweenTwoCities function

  //cache the distances for all combination of two cities
  //key is always comprised of the smaller index + "_" + larger index
  for (var i = 0; i < citiesData.length - 1; i++) {
    for (var j = i + 1; j < citiesData.length; j++) {
      distancesMap[i + '_' + j] = calculateDistanceBetweenTwoCities(i, j);
    };
  };

  function checkDistance(cityA, cityB) {
    return cityA < cityB ? distancesMap[cityA + '_' + cityB] : distancesMap[cityB + '_' + cityA];
  }

  return {
    getCities: function() {
      // console.log(citiesData);
    },
    calculateTotalDistance: function(solution) {
      if (!(solution instanceof Array)) throw new Error('invalid arguments');

      var totalDistance = 0;
      for (var i = 0; i < solution.length - 1; i++) {
        totalDistance += checkDistance(solution[i], solution[i + 1]);
      }
      totalDistance += checkDistance(solution[solution.length - 1], solution[0]);

      return totalDistance;
    }
  };
}
var c= Cities([ { name: 'Orgrimmar', xPos: 271, yPos: 120 },
  { name: 'Stormwind', xPos: 300, yPos: 20 },
  { name: 'Darnassus', xPos: 550, yPos: 50 },
  { name: 'Ironforge', xPos: 900, yPos: 500 },
  { name: 'Silvermoon', xPos: 650, yPos: 450 },
  { name: 'Undercity', xPos: 158, yPos: 369 },
  { name: 'Thunder Bluff', xPos: 550, yPos: 400 } ])

module.exports = Cities;