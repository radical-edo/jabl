'use strict';
const _ = require('lodash');

module.exports = function attributes(...args) {
  args.forEach(key => {
    let keyName, prop;
    if (_.isObject(key)) {
      [key, keyName] = _.chain(key).toPairs().flatten().value();
    }
    prop = this.datum[key];
    this.resultObject[keyName ? keyName : key] = _.isFunction(prop) ? prop() : prop;
  });
};
