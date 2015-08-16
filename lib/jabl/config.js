'use strict';

var config = {
  searchPaths: [],
};


module.exports = function (callback) {
  if ('function' === typeof callback) {
    callback(config);
  } else {
    return config;
  }
};
