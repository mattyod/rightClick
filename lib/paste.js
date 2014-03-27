var fs  = require('fs'),
    path = require('path'),
    log = require('col');

module.exports = function (target) {

  var check = function (target) {

    if (fs.existsSync(target)) {

      log.error(target + ' already exists.');

      process.exit(1);

    } else {

      return true;

    }

  };

  var paste = function (target, clip) {

    for (var item in clip) {

      if (clip.hasOwnProperty(item)) {

        var newTarget = path.resolve(target, item);

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
