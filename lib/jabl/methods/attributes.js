'use strict';

module.exports = function () {
  var digestor = this;
  Array.prototype.forEach.call(arguments, function (key) {
    digestor.resultObject[key] = digestor.object[key];
  });
};
