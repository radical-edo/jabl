'use strict';

var _ = require('lodash');

module.exports = function attributes() {
  var engine = this;
  _.forEach(arguments, function (key) {
    let keyName, prop;
    if (_.isObject(key)) {
      [key, keyName] = _.chain(key).toPairs().flatten().value();
    }
    prop = engine.datum[key];
    engine.resultObject[keyName ? keyName : key] = _.isFunction(prop) ? prop() : prop;
  });
};
