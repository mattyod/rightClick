/*jslint
    white: true,        indent: 2,          browser: false,     devel: false,
    onevar: true,       nomen: true,        eqeqeq: false,      plusplus: true,
    bitwise: true,      regexp: true,       newcap: true,       immed: false,
    maxlen: 80,         smarttabs: false,   undef: true,        trailing: true,
    strict: true,       expr: true,
*/
var path  = require('path'),
    fs    = require('fs');

module.exports = function (path) {
  'use strict';

  this.copy(path).del(path);

  return this;

};