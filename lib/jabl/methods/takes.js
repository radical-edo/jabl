'use strict';

var fs = require('fs');

var _ = require('lodash');

var config = require('../config');

module.exports = function takes(path, options) {
  options = _.merge({ locals: {} }, options);
  path = path + '.jabl'; // TODO: check what path has been acutall passed
  var engine = this;
  _.merge(engine, options);
  var template = fs.readFileSync(config.searchPaths[0] + path); // TODO: make it actually async
                                                                // TODO: actually support searchPaths
  return engine.ignite(template);
};
