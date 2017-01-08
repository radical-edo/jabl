'use strict';
const { last } = require('lodash');

const config = {
  searchPaths: {
    __paths: [],
    add: function (path) {
      if ('/' !== last(path)) {
        path += '/';
      }
      config.searchPaths.__paths.push(path);
    }
  }
};

module.exports = config;
