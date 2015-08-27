'use strict';

var config = require('../config');
var fs = require('fs');

module.exports = function (path) {
  path = path + '.jabl';
  var digestor = this;
  var template = fs.readFileSync(config().searchPaths[0] + path);
  return digestor.digest(digestor.object, template);
};
