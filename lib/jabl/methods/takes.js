'use strict';
const fs = require('fs');

const _ = require('lodash');

const config = require('../config');

module.exports = function takes(path, options) {
  options = _.merge({ locals: {} }, options);
  path = path + '.jabl'; // TODO: check what path has been acutall passed
  const engine = this;
  _.merge(engine, options);
  const template = fs.readFileSync(config.searchPaths.__paths[0] + path); // TODO: make it actually async
                                                                // TODO: actually support searchPaths
  return engine.ignite(template);
};
