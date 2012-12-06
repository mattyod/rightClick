/*jslint
    white: true,        indent: 2,          browser: false,     devel: false,
    onevar: true,       nomen: true,        eqeqeq: true,       plusplus: true,
    bitwise: true,      regexp: true,       newcap: true,       immed: false,
    maxlen: 80,         smarttabs: false,   undef: true,        trailing: true,
    strict: true,       expr: true,
*/
var fs  = require('fs'),
    sep = require('path').sep;

module.exports = function (path) {
  'use strict';

  // Clear clipboard.
  this.clipboard.files = {};

  // Push single path into array object
  if (typeof path === 'string') {

    path = [path];

  }

  path.forEach(function (path) {

    var fullPath = this.clipboard.target + sep +  path;

    var copy = function (fullPath, path, clip) {

      if (fs.statSync(fullPath).isDirectory()) {

        // Create folder object and update local reference to it.
        clip = clip[path] = {};

        // Get source folder contents.
        var paths = fs.readdirSync(fullPath);

        paths.forEach(function (path) {

          var newPath = fullPath + sep + path;

          // Copy down into the next level.
          copy.call(this, newPath, path, clip);

        }, this);

      } else {

        // Copy file content to clipboard.
        clip[path] = fs.readFileSync(fullPath);

      }

    };

    if (fs.existsSync(fullPath)) {

      // Clear clipboard and create local reference to it.
      var clip = this.clipboard.files;

      // Begin deep copy.
      copy.call(this, fullPath, path, clip);

    }

  }, this);

  return this;

};