'use strict';

var config = require('./jabl/config');

var Jabl = (function () {
  function Jabl() {}

  Jabl.Renderer = require('./jabl/renderer');

  Jabl.Config = function (yielder) {
    yielder(config);
  };

  return Jabl;
})();

module.exports = Jabl;
