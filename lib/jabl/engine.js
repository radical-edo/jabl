'use strict';

var _ = require('lodash');
var METHODS = require('./methods');

var Engine = (function () {
  var ENGINE = 'with(this) { #{BLOCK} }';

  function Engine(template, data) {
    this.template = template;
    this.data = data;
  }


  _.merge(Engine.prototype, METHODS);

  Engine.run = function (template, objects, callback) {
    var engine = new Engine(template, objects);
    engine.run(callback);
  };

  Engine.prototype.run = function (callback) {
    var engine = this;
    engine.data.forEach(function (datum) {
      engine.datum = datum;
      engine.resultObject = {};
      engine.ignite(engine.template);
      engine.addToResults(engine.resultObject);
    });
    callback(JSON.stringify(engine.result));
  };

  Engine.prototype.ignite = function (template) {
    var engine = ENGINE.replace('#{BLOCK}', template);
    (new Function(engine)).call(this); // jshint ignore:line
  };

  return Engine;
})();

module.exports = Engine;
