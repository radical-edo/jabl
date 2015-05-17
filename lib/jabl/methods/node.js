'use strict';

var helpers = require('../helpers');

var JablNode = (function () {
  function JablNode() {};

  JablNode.prototype.digest = function () {
    var object = helpers.pop(arguments);
    var template = helpers.pop(arguments);
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
  };

  return JablNode;
})();


module.exports = JablNode;
