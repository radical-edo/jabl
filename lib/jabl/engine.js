'use strict';

var _ = require('lodash');

var Engine = (function () {
  var METHODS = require('./methods');
  var digestor = require('./digestor');

  function Engine(template, objects) {
    this.template = template;
    this.objects = objects;
    this.result = [];
  };

  Engine.render = function (template, objects, callback) {
    var engine = new Engine(template, objects);
    engine.render(callback);
  }

  Engine.prototype.render = function (callback) {
    this.objects.forEach(function (object) {
      this.result.push(digestor.digest(object, this.template));
    }, this);
    callback(JSON.stringify(this.result));
  };

  return Engine;
})();

module.exports = Engine;
