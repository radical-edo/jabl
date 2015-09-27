'use strict';

var config = require('../config');
var fs = require('fs');

module.exports = function partial(path, options) {
  path += '.jabl';  // TODO: check what path has been acutall passed
  var engine = this;
  var template = fs.readFileSync(config.searchPaths[0] + path);
  var result;
  engine.reignite(template, options)
    .object()
    .run(function (jsonRes) {
      result = JSON.parse(jsonRes);
    });
  return result;
};
