require('coffee-script/register');
var path = require('path');

global.expect = require('chai').expect;
global.context = describe;
global.__rootdir = path.normalize(__dirname + '/..');
global.__testdir = __dirname;
