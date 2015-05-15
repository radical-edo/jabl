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

  var pop = function (arrayLike) {
    return Array.prototype.pop.call(arrayLike);
  }

  var METHODS = {
    node: function () {
      var object = pop(arguments);
      var template = pop(arguments);
      var nodeStart = template.indexOf('node');
      var nodeEnd = template.indexOf('}', nodeStart);
      var node = template.slice(nodeStart, nodeEnd + 1);
      template = template.replace(node, '');
      var result = {};
      var key = arguments[0].replace(':', '');
      var funcStart = node.indexOf('(')
      var fatArrowFunc = node.slice(funcStart);
      var definition = fatArrowFunc.slice(0, fatArrowFunc.indexOf('{'));
      fatArrowFunc = fatArrowFunc.replace(definition, '(function (post) ') + ')(object)';
      fatArrowFunc = fatArrowFunc.split('\n');
      fatArrowFunc[fatArrowFunc.length - 2] = 'return ' + fatArrowFunc[fatArrowFunc.length - 2]
      fatArrowFunc = fatArrowFunc.join('\n');
      result[key] = eval(fatArrowFunc);
      return result;
    },
    attributes: function () {
      var object = pop(arguments);
      var template = pop(arguments);
      var result = {};
      _.forEach(arguments, function (arg) {
        arg = arg.replace(/[:,]/g, '');
        if (undefined === object[arg]) {
         throw new Error('undefined method or property' + arg); 
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
