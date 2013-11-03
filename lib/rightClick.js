/*jslint
    white: true,        indent: 2,          browser: false,     devel: false,
    onevar: true,       nomen: true,        eqeqeq: false,      plusplus: true,
    bitwise: true,      regexp: true,       newcap: true,       immed: false,
    maxlen: 80,         smarttabs: false,   undef: true,        trailing: true,
    strict: false,      expr: true,
*/

/*global
    require: false,
*/

var fs = require('fs'),
    log = require('col');

module.exports = function (location) {

  this.clipboard = {

    target: location,

    files: {}

  };

  this.copy = require('../lib/copy');

  this.paste = require('../lib/paste');

  this.del = require('../lib/del');

  this.cut = require('../lib/cut');

  // If passed a valid path.
  if (fs.existsSync(location)) {

    // Set location as current clipboard target.
    this.clipboard.target = location;

    // Return self for chaining
    return this;

  } else {

    log.error(location + ' not found');

    return false;

  }

};