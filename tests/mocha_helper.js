require('coffee-script/register');
var path = require('path');
var strap = require('node-strap');

global.expect = require('expect.js');
global.context = describe;
global.__rootdir = path.normalize(__dirname + '/..');
global.__testdir = __dirname;
global.Factory = require('rosie').Factory
var Validator = require('jsonschema').Validator;
global.json = new Validator();
var Jabl = require(__rootdir + '/lib/jabl');
Jabl.Config(function (config) {
  config.searchPaths.push('tests/fixtures/templates/');
});

strap.files(__testdir + '/factories');
