'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var Jabl = (function () {
  function Jabl(templatePath, object) {
    this.templatePath = templatePath + '.rabl';
    this.objects = object;
  };

  Jabl.searchPaths = [];

  Jabl.prototype.render = function (callback) {
    this.result = [];
    fs.readFile(path.resolve(Jabl.searchPaths[0], this.templatePath), function (err, data) {
      data = data.toString();
      var methodCache = null;
      this.objects.forEach(function (object) {
        var parsedObject = {};
        data.split('\n').forEach(function (line) {
          var words = line.split(' ');
          methodCache = words[0];
          words.push(data);
          words.push(object);
          if (METHODS[methodCache]) {
            _.merge(parsedObject, METHODS[methodCache].apply(this, words.slice(1)));
          }
        }, this);
        this.result.push(parsedObject);
      }, this);
      callback(JSON.stringify(this.result));
    }.bind(this));
  };
  function Jabl() {};


  
  var parse = function (string) {
    var method = string.split('\s')[0];
  }
  Jabl.Config = require('./jabl/config');

  return Jabl;
})();

module.exports = Jabl;
