'use strict';

exports.cities = function(req, res) {
  console.log(req.body);
  return res.json({hello: 'pk'});
}