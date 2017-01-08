'use strict';

var fs = require('fs');

var _ = require('lodash');

var config = require('../config');

module.exports = function partial(path, options) {
  options = _.merge({ locals: {} }, options);
  path += '.jabl';  // TODO: check what path has been acutall passed
  const template = fs.readFileSync(config.searchPaths.__paths[0] + path);
  var engine = this;
  var result;
  engine = engine.reignite(template, options);
  _.merge(engine, _.omit(options, 'object'));
  engine.object().run(function (data) {
    result = data;
  });
  return result;
};
