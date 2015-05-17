'use strict';

var _ = require('lodash');

var Engine = (function () {
  var METHODS = require('./methods');

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
      var parsedObject = {};
      this.template.split('\n').forEach(function (line) {
        var words = line.split(' ');
        words.push(this.template);
        words.push(object);
        if (METHODS[words[0]]) {
          var method = new METHODS[words[0]];
          _.merge(parsedObject, method.digest.apply(method, words.slice(1)));
        }
      }, this);
      this.result.push(parsedObject);
    }, this);
    callback(JSON.stringify(this.result));
  };

  return Engine;
})();

module.exports = Engine;
