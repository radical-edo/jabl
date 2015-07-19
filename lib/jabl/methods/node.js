'use strict';

module.exports = function (jsonKey, callback) {
  this.resultObject[jsonKey] = callback(this.object);
};
