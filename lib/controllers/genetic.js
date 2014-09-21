'use strict';

var _ = require('lodash'),
  Genome = require('./genome'),
  Cities = require('./cities');

function Genetic() {
  var genomesArr = [],
    cities,
    totalFitnessScore,
    //best scores for a particular population
    bestSolution,
    bestSolutionScore,
    POPSIZE,
    CROSSOVERRATE,
    MUTATIONRATE,
    ELITISM_NUMBER;

  return {
    init: function(populationSize, crossoverRate, mutationRate, citiesData, elitismNumber) {
      //initializes the first generation of geneomes and calculates their fitness scores
      for (var i = 0; i < populationSize; i++) {
        genomesArr[i] = new Genome(citiesData.length);
      };

      cities = Cities(citiesData);
      POPSIZE = populationSize;
      CROSSOVERRATE = crossoverRate;
      MUTATIONRATE = mutationRate;
      ELITISM_NUMBER = typeof elitismNumber === 'undefined' ? 0 : elitismNumber;

      this.updateFitnessScore();
    },
    getGenomesArr: function() {
      return genomesArr;
    },
    updateFitnessScore: function() {
      var moveArrForGenome = [],
        totalDistances = [],
        longestDistance;

      //resets totalFitnessScore and recalculates
      totalFitnessScore = 0;
      bestSolution = null;
      bestSolutionScore = Number.NEGATIVE_INFINITY,      

      _.each(genomesArr, function(genome, index) {
        //gets results and updates genome's fitnessScore
        totalDistances[index] = cities.calculateTotalDistance(genome.genes);
      });
      
      //the longest the distance, the worst the score
      longestDistance = Math.max.apply(null, totalDistances);

      _.each(genomesArr, function(genome, index) {
        genome.updateFitnessScore(longestDistance - totalDistances[index]);
        totalFitnessScore += genome.fitnessScore;

        if (genome.fitnessScore > bestSolutionScore) {
          bestSolution = genome
          bestSolutionScore = genome.fitnessScore;
        };        
      });
    },
    printScores: function() {
      console.log('*******************');
      console.log('Current best score: ' + bestSolution.fitnessScore);
      console.log('Current shortest distance: ' + cities.calculateTotalDistance(bestSolution.genes));
    },
    rouletteWheelSelection: function() {
      var total = 0,
        threshold = totalFitnessScore * Math.random();

      for (var i = 0; i < genomesArr.length; i++) {
        total += genomesArr[i].fitnessScore;

        if (total >= threshold) break;
      };

      return genomesArr[i];
    },
    crossover: function(p1, p2) {
      //creates clones of the parents to ensure that changing them do not affect parents
      var childA = p1.clone(),
        childB = p2.clone();
      
      //crossover
      if (Math.random() < CROSSOVERRATE) {
        childA.swapPMX(childB);
      };

      //mutation - test for childA and childB should be separate
      if (Math.random() < MUTATIONRATE) {
        childA.mutate();
      }

      if (Math.random() < MUTATIONRATE) {
        childB.mutate();
      }

      return [childA, childB];
     },
    epoch: function() {
      var newPop = [],
        newPopCount = 0,
        mom,
        dad;

      //elitism - the top few instances are automatically passed unchanged into the next generation
      //we sort the genomes array by fitness score so that we can easily find the top few instances
      genomesArr.sort(function(a, b) {
        return b.fitnessScore - a.fitnessScore;
      });

      for (var i = 0; i < ELITISM_NUMBER; i++) {
        newPopCount++;
        newPop.push(genomesArr[i].clone());
      };

      //fills up the remainder of the population via natural selection
      while (newPopCount < POPSIZE) {
        mom = this.rouletteWheelSelection();
        dad = this.rouletteWheelSelection();

        newPop = newPop.concat(this.crossover(mom, dad));
        newPopCount += 2;
      };

      //saves the new population and calculates new fitness scores
      genomesArr = newPop;
      this.updateFitnessScore();
    },
    main: function() {
      var counter = 0;
      while(counter < 10) {
        this.epoch();
        // this.printScores();
        counter++;
      }
      this.printScores();
      return bestSolution.genes;
    }
  }
};

module.exports = Genetic;