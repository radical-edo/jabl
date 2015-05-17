'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var Jabl = (function () {
  function Jabl(templatePath, object) {
    this.templatePath = templatePath + '.rabl';
    this.objects = object;
  };

  function Jabl() {};


  Jabl.Config = require('./jabl/config');

  return Jabl;
})();

module.exports = Jabl;
