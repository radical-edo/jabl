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
    }.bind(this));
  };
  function Jabl() {};


  Jabl.Config = require('./jabl/config');

  return Jabl;
})();

module.exports = Jabl;
