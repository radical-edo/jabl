'use strict';

var helpers = require('../helpers');
var _ = require('lodash');

var JablAttributes = (function () {
  function JablAttributes() {}

  JablAttributes.prototype.digest = function () {
    var object = helpers.pop(arguments);
    var template = helpers.pop(arguments);
    var result = {};
    _.forEach(arguments, function (arg) {
      arg = arg.replace(/[:,]/g, '');
      if (undefined === object[arg]) {
        throw new Error('undefined method or property' + arg); 
      }
      result[arg] = object[arg];
    }, this);
    return result;
  };

  return JablAttributes;
})();

module.exports = JablAttributes;
