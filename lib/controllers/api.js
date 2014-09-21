'use strict';

var Genetic = require('./genetic');

var genetic;

exports.cities = function(req, res) {
  var results;

  genetic = new Genetic();
  genetic.init(50, 0.7, 0.01, req.body, 1);
  results = genetic.main();

  return res.json({moves: results});
}
