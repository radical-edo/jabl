'use strict';

var _ = require('lodash');

module.exports = function () {
  var engine = this;
  engine.result = {};
  engine.addToResults = function (object) {
    _.merge(engine.result, object);
  };
};