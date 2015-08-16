'use strict';

var Jabl = (function () {
  function Jabl() {}

  Jabl.Renderer = require('./jabl/renderer');

  Jabl.Config = require('./jabl/config');

  return Jabl;
})();

module.exports = Jabl;
