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
      data = data.toString().split('\n');
      data.forEach(function (line) {
        var words = line.split(' ');
        this.objects.forEach(function (object) {
          words.push(object);
          if (METHODS[words[0]]) {
            this.result.push(METHODS[words[0]].apply(this, words.slice(1)));
          }
        }, this);
      }, this);
      callback(JSON.stringify(this.result));
    }.bind(this));
  };

  var METHODS = {
    attributes: function () {
      var object = Array.prototype.pop.call(arguments);
      var result = {};
      Array.prototype.forEach.call(arguments, function (arg) {
        arg = arg.replace(/[:,]/g, '');
        if (undefined === object[arg]) {
         throw new Error('undefined method ' + arg); 
        }
        result[arg] = object[arg];
      }, this);
      return result;
    },
  }
  
  var parse = function (string) {
    var method = string.split('\s')[0];
  }

  return Jabl;
})();

module.exports = Jabl;
