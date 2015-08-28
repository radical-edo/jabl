'use strict';

var path = require('path');
var fs = require('fs');
var config = require('./config');
var Engine = require('./engine');


var Renderer = (function () {
  function Renderer(path, objects) {
    this.path = path + '.jabl';
    this.objects = objects;
  }

  Renderer.prototype.render = function (callback) {
    var renderer = this;
    fs.readFile(path.resolve(config.searchPaths[0], this.path), function (err, data) { // TODO: actually support searchPaths
      data = data.toString();
      Engine.render(data, renderer.objects, callback);
    });
  };

  return Renderer;
})();

module.exports = Renderer;
