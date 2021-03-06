'use strict';
const path = require('path');
const BPromise = require('bluebird');
const fs = BPromise.promisifyAll(require('fs'));
const config = require('./config');
const Engine = require('./engine');

class Renderer {
  render() {
    const renderer = this;
    return fs.readFileAsync(path.resolve(config.searchPaths.__paths[0], this.path))
      .then(function (data) {
        return new BPromise(function (resolve, reject) {
          Engine.run(data.toString(), renderer.objects, resolve);
        });
      });
  }

  constructor(path, objects) {
    this.path = path + '.jabl';
    this.objects = objects;
  }
}

module.exports = Renderer;
