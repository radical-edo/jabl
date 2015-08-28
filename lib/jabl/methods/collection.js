'use strict';

module.exports = function () {
  var engine = this;
  engine.result = engine.result || [];
  engine.addToResults = engine.addToResults || function (obj) {
    engine.result.push(obj);
  };
};
