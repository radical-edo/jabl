'use strict';

var helpers = require('../helpers');
var _ = require('lodash');

module.exports = function () {
  var digestor = this;
  Array.prototype.forEach.call(arguments, function (key) {
    digestor.resultObject[key] = digestor.object[key];
  });
};
