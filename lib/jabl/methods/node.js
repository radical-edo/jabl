'use strict';

module.exports = function node(jsonKey, callback) {
  this.resultObject[jsonKey] = callback(this.datum);
};
