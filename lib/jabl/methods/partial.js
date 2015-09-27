'use strict';

var config = require('../config');
var fs = require('fs');

module.exports = function partial(path, options) {
  path += '.jabl';  // TODO: check what path has been acutall passed
  var engine = this;
  var template = fs.readFileSync(config.searchPaths[0] + path);
  var result;
  var engine2 = engine.reignite(template, options);
  engine2.object();
  engine2.run(function (jsonRes) {
    result = JSON.parse(jsonRes);
  });
  return result;
};
