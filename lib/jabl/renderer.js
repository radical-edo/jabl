'use strict';

var path = require('path');
var fs = require('fs');
var Config = require('./config');
var Engine = require('./engine');

var Renderer = (function () {
  function Renderer(path, objects) {
    this.path = path + '.jabl';
    this.objects = objects;
  };

  Renderer.prototype.render = function (callback) {
    fs.readFile(path.resolve(Config().searchPaths[0], this.path), function (err, data) {
      data = data.toString();
      Engine.render(data, this.objects, callback);
    }.bind(this));
  };

  return Renderer;
})();

module.exports = Renderer;
