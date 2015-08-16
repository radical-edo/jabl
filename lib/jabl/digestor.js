'use strict';

var _ = require('lodash');
var METHODS = require('./methods');

var Digestor = (function () {
  var instance = {};

  _.merge(instance, METHODS);

  instance.digest = function (object, template) {
    instance.resultObject = {};
    instance.object = object;
    var fn = 'with(this) { #{template} }'.replace('#{template}', template);
    (new Function(fn)).call(instance); // jshint ignore:line
    return instance.resultObject;
  };

  return instance;
})();

module.exports = Digestor;
