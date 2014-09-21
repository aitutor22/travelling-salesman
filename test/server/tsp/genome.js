'use strict';

var Genome = require('../../../lib/controllers/genome'),
  _ = require('lodash'),
  should = require('should');
  
var genome;

//test if genes of passed in genome are valid
//all elements should be numbers, and there shouldn't be any duplicates
function validGenes(g) {
  var test = g.genes.slice();
  test.sort(function(a, b) {
    return a - b;
  });

  for (var i = 0; i < test.length; i++) {
    if (typeof test[i] !== 'number') return false;
    if (test[i] !== i) return false;
  };
  return true;
}

describe('constructor', function() {
  beforeEach(function() {
    genome = new Genome(5);
  });

  it('create a genome with a gene array with same length as number of cities passed in', function(){
    (genome.genes instanceof Array).should.equal.true;
    genome.genes.length.should.equal(5);
  });

  it('should have a gene array with numbers from 0 to num of cities - 1, all should be duplicate entries', function() {
    validGenes(genome).should.be.true;
  });
});

describe('updateFitnessScore function', function() {
  beforeEach(function() {
    genome = new Genome(10);
  });

  it('should take a number', function() {
    (function() {
      genome.updateFitnessScore(1);
    }).should.not.throw();

    (function() {
      genome.updateFitnessScore();
    }).should.throw('invalid argument passed in');
  });

  it('should take a number greater or equals to 0', function() {
    (function() {
      genome.updateFitnessScore(-1);
    }).should.throw('should take a number greater or equals to 0');
  });

  it('should update fitnessScore field', function() {
    genome.fitnessScore = 0.5;

    genome.updateFitnessScore(1);
    genome.fitnessScore.should.equal(1);
  })
});

describe('clone function', function() {
  beforeEach(function() {
    genome = new Genome(10);
  });

  it('should return a new genome', function() {
    var child = genome.clone();
    (child instanceof Genome).should.be.true;
  });

  it('should return a new genome with the same genes array as the current genome', function() {
    var child = genome.clone();
    _.isEqual(genome.genes, child.genes).should.be.true;
  });

  it('changing the bits of the child genome shouldn\'t affect parent genome', function() {
    var child = genome.clone();
    //modifies the first bit of the child genome

    var temp = child.genes[0];
    child.genes[0] = child.genes[1];
    child.genes[1] = temp;

    _.isEqual(child.genes, genome.genes).should.be.false;
  });
});

describe('swapPMXHelper function', function() {
  var genome2;
  beforeEach(function() {
    genome = new Genome(8);
    genome2 = new Genome(8);
  });  

  it('should work when start is the beginning of the array', function() {
    genome.genes = [2, 5, 0, 3, 6, 1, 4, 7]
    genome2.genes = [3, 4, 0, 7, 2, 5, 1, 6]

    genome.swapPMXHelper(genome2, 0, 2);
    _.isEqual(genome.genes, [3, 4, 0, 2, 6, 1, 5, 7]).should.be.true;
    _.isEqual(genome2.genes, [2, 5, 0, 7, 3, 4, 1, 6]).should.be.true;    
  });

  it('should work when end is the last element in array', function() {
    genome.genes = [2, 5, 0, 3, 6, 1, 4, 7]
    genome2.genes = [3, 4, 0, 7, 2, 5, 1, 6]

    genome.swapPMXHelper(genome2, 6, 8);
    _.isEqual(genome.genes, [2, 5, 0, 3, 7, 4, 1, 6]).should.be.true;
    _.isEqual(genome2.genes, [3, 1, 0, 6, 2, 5, 4, 7]).should.be.true;   
  });

  it('should work work for edge cases', function() {
    genome.genes = [2, 3, 1, 4, 0, 7, 5, 6];
    genome2.genes = [1, 2, 0, 3, 4, 5, 6, 7];

    genome.swapPMXHelper(genome2, 6, 8);
    validGenes(genome).should.be.true;
    validGenes(genome2).should.be.true;

    genome.genes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    genome2.genes = [0, 5, 4, 6, 9, 2, 1, 7, 8, 3];

    genome.swapPMXHelper(genome2, 2, 6);
    validGenes(genome).should.be.true;
    validGenes(genome2).should.be.true;    
  });

  it('test cases', function() {
    genome.genes = [2, 5, 0, 3, 6, 1, 4, 7]
    genome2.genes = [3, 4, 0, 7, 2, 5, 1, 6]
    genome.swapPMXHelper(genome2, 3, 6);

    validGenes(genome).should.be.true;
    validGenes(genome2).should.be.true; 
    _.isEqual(genome.genes, [6, 1, 0, 7, 2, 5, 4, 3]).should.be.true;
    _.isEqual(genome2.genes, [7, 4, 0, 3, 6, 1, 5, 2]).should.be.true;
  });
});

describe('swapPMX function', function() {
  var genome2;
  beforeEach(function() {
    genome = new Genome(8);
    genome2 = new Genome(8);
  }); 

  it('after swapping, each genome should not have any duplicate numbers', function() {
    genome.swapPMX(genome2);
    validGenes(genome).should.be.true;
    validGenes(genome2).should.be.true;
  })  
});

// describe('mutate function', function() {
//   beforeEach(function() {
//     genome = new Genome(10);
//   });

//   it('after mutation, genome\'s genes should be different from original', function() {
//     var originalGenes = genome.genes.slice();
//     genome.mutate();
//     _.isEqual(genome.genes, originalGenes).should.be.false;
//   });

//   it('after mutation, the genome\'s genes should still be be valid', function() {

//   });
// });