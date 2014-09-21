'use strict';

var _ = require('lodash'),
  Utility = require('./utility');

function Genome(numCities) {
  this.genes = [];
  this.fitnessScore;

  this.genes = _.range(numCities).sort(function(a, b) {
    return Math.random() > 0.5;
  });
}

Genome.prototype.updateFitnessScore = function(fs) {
  if (typeof fs !== 'number') throw new Error('invalid argument passed in');
  if (fs < 0) throw new Error('should take a number greater or equals to 0');

  this.fitnessScore = fs;
};

//returns a new genome with the same genes array as current genome
Genome.prototype.clone = function() {
  var result = new Genome();
  result.genes = this.genes.slice();

  return result;
};

//takes a target genome as an argument and swap bits with current genome
Genome.prototype.swapPMX = function(target) {

  //returns a number from 0 until length of genes - 2 (since Math.random() never returns 1)
  var startPos = Math.floor(Math.random() * (this.genes.length - 1)),
    //returns a number that is greater than startPos and less than or equal to the length of the genes array
    endPos = startPos + 1 + Math.floor(Math.random() * (this.genes.length - startPos));

  this.swapPMXHelper(target, startPos, endPos);
};

//swaps all elements that match the elements from start (inclusive) to end (not inclusive)
//break it out into helper function to make testing easier
Genome.prototype.swapPMXHelper = function(target, start, end) {
  var modifiedGenes = [],
    modifiedTargetedGenes = [],
    map = {},
    invertedMap = {};

  for (var i = start; i < end; i++) {
    map[this.genes[i]] = target.genes[i];
    invertedMap[target.genes[i]] = this.genes[i];
  };

  //swaps the genes portions from start to end
  modifiedGenes = this.genes.slice(0, start).concat(target.genes.slice(start, end)).concat(this.genes.slice(end));
  modifiedTargetedGenes = target.genes.slice(0, start).concat(this.genes.slice(start, end)).concat(target.genes.slice(end));

  for (var j = 0; j < modifiedGenes.length; j++) {
    if (j >= start && j < end) continue;

    if (invertedMap.hasOwnProperty(modifiedGenes[j])) modifiedGenes[j] = invertedMap[modifiedGenes[j]];
    if (map.hasOwnProperty(modifiedTargetedGenes[j])) modifiedTargetedGenes[j] = map[modifiedTargetedGenes[j]];
  }

  this.genes = modifiedGenes;
  target.genes = modifiedTargetedGenes;
}

module.exports = Genome;