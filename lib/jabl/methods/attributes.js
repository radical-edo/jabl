'use strict';

var _ = require('lodash');

module.exports = function () {
  var engine = this;
  Array.prototype.forEach.call(arguments, function (key) {
    var prop = engine.datum[key];
    engine.resultObject[key] = _.isFunction(prop) ? prop() : prop;
  });
};
