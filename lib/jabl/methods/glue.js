'use strict';

var _ = require('lodash');

module.exports = function glue(datum, callback) {
  var engine = this;
  var prevDatum = _.clone(this.datum);
  var res = _.clone(engine.resultObject);
  this.datum = datum;
  engine.resultObject = {};
  callback.call(engine);
  this.datum = prevDatum;
  _.merge(res, engine.resultObject);
  engine.resultObject = res;
};
