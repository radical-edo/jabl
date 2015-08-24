'use strict';

var _ = require('lodash');

module.exports = function () {
  var digestor = this;
  Array.prototype.forEach.call(arguments, function (key) {
    var prop = digestor.object[key];
    digestor.resultObject[key] = _.isFunction(prop) ? prop() : prop;
  });
};
