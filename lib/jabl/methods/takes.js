'use strict';

var config = require('../config');
var fs = require('fs');

module.exports = function (path) {
  path = path + '.jabl'; // TODO: check what path has been acutall passed
  var engine = this;
  var template = fs.readFileSync(config.searchPaths[0] + path); // TODO: make it actually async
                                                                // TODO: actually support searchPaths
  // TODO:
  // the object build by going deeper isn't merged into one object after the recurrsion finished
  
  return engine.ignite(template);
};
