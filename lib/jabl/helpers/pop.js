'use strict';

module.exports = function (arrayLike) {
  return Array.prototype.pop.call(arrayLike);
};

