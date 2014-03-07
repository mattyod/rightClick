var fs  = require('fs'),
    sep = require('path').sep;

module.exports = function (path) {

  // Clear clipboard.
  this.clipboard.files = {};

  // Push single path into array object
  if (typeof path === 'string') {

    path = [path];

  }

  path.forEach(function (path) {

    var fullPath = this.clipboard.target + sep +  path,
        encoding = this.encoding;

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
        clip[path] = fs.readFileSync(fullPath, encoding);

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