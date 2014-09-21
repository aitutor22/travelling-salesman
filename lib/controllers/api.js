'use strict';

var Cities = require('./cities');

exports.cities = function(req, res) {
  console.log(req.body);
  return res.json({hello: 'pk'});
}