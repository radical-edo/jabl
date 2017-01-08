'use strict';
const path = require('path');
const strap = require('node-strap');
const { Validator } = require('jsonschema');

const Jabl = require('../lib/jabl');

global.expect = require('expect.js');
global.context = describe;
global.__testdir = __dirname;
global.Factory = require('rosie').Factory
global.json = new Validator();
Jabl.Config(function (config) {
  config.searchPaths.add('tests/fixtures/templates');
});

strap.files(__testdir + '/factories');
