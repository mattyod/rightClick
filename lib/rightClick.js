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

    process.exit(1);

  }

};