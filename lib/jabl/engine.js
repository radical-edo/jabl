'use strict';

var _ = require('lodash');
var METHODS = require('./methods');

var Engine = (function () {
  var ENGINE = 'with(this) { #{BLOCK} }';

  function Engine(template, data) {
    if (!_.isArray(data)) {
      duckType(data);
    }
    this.template = template;
    this.data = data;
  }

  function duckType(dataObj) {
    dataObj.forEach = function (iteratee) {
      iteratee(dataObj);
    };
  }

  _.merge(Engine.prototype, METHODS);

  Engine.run = function (template, objects, callback) {
    var engine = new Engine(template, objects);
    engine.run(callback);
  };

  Engine.prototype.reignite = function (template, options) {
    return new Engine(template, options.object);
  };

  Engine.prototype.run = function (callback) {
    var engine = this;
    engine.data.forEach(function (datum) {
      engine.datum = datum;
      engine.resultObject = {};
      engine.ignite(engine.template);
      engine.addToResults(engine.resultObject);
    });
    callback(engine.result);
  };

  Engine.prototype.ignite = function (template, options) {
    options = options || {};
    var _this = options.object || this;
    var engine = ENGINE.replace('#{BLOCK}', template);
    (new Function(engine)).call(_this); // jshint ignore:line
  };

  return Engine;
})();

module.exports = Engine;
