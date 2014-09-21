'use strict';

var _ = require('lodash');

function replace(arr, item, replaceWith) {
  var result = arr.slice();

  for (var i = 0; i < result.length; i++) {
    if (result[i] === item) result[i] = replaceWith;
  }
  return result;
}

module.exports = {
  replace: replace
};

