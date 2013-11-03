/*jslint
    white: true,        indent: 2,          browser: false,     devel: false,
    onevar: true,       nomen: true,        eqeqeq: false,      plusplus: true,
    bitwise: true,      regexp: true,       newcap: true,       immed: false,
    maxlen: 80,         smarttabs: false,   undef: true,        trailing: true,
    strict: false,      expr: true,
*/

/*global
    Buffer:false,
*/

// Helper modules
var fs  = require('fs'),
    sep = require('path').sep,
    log = require('col');

module.exports = function (target) {

  var check = function (target) {

    if (fs.existsSync(target)) {

      log.error(target + ' already exists.');

      return false;

    } else {

      return true;

    }

  };

  var paste = function (target, clip) {

    for (var item in clip) {

      if (clip.hasOwnProperty(item)) {

        var newTarget = target + sep + item;

        if (check(newTarget)) {

          // Check item is an object but not a buffer array.
          if (typeof clip[item] === 'object' && !Buffer.isBuffer(clip[item])) {

            fs.mkdirSync(newTarget);

            paste(newTarget, clip[item]);

          } else {

            fs.writeFileSync(newTarget, clip[item]);

          }

        }

      }

    }

  };

  paste(target, this.clipboard.files);

  return this;

};