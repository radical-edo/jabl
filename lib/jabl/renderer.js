'use strict';
const path = require('path');
const BPromise = require('bluebird');
const fs = BPromise.promisifyAll(require('fs'));
const config = require('./config');
const Engine = require('./engine');


var Renderer = (function () {
  function Renderer(path, objects) {
    this.path = path + '.jabl';
    this.objects = objects;
  }

  Renderer.prototype.render = function () {
    const renderer = this;
    return fs.readFileAsync(path.resolve(config.searchPaths[0], this.path)).then(function (data) {
      return new BPromise(function (resolve, reject) {
        Engine.run(data.toString(), renderer.objects, resolve);
      });
    }).catch(function (err) {
      console.error(err);
    });
  };

  return Renderer;
})();

module.exports = Renderer;
