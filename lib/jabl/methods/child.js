'use strict';

var _ = require('lodash');

module.exports = function child(key, callback) {
  var engine = this;
  var previousDatum = _.clone(engine.datum);
  var res = _.clone(engine.resultObject);
  res[key] = engine.datum[key].map(function (datum) {
    engine.datum = datum;
    engine.resultObject = {};
    callback.call(engine);
    return engine.resultObject;
  });
  engine.datum = previousDatum;
  engine.resultObject = res;
};
