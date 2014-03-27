var fs  = require('fs'),
    path = require('path');

module.exports = function (docPath) {

  // Clear clipboard.
  this.clipboard.files = {};

  // Push single path into array object
  if (typeof docPath === 'string') {

    docPath = [docPath];

  }

  docPath.forEach(function (docPath) {

    var fullPath = path.resolve(this.clipboard.target, docPath),
        enc = this.enc;

    var copy = function (fullPath, docPath, clip) {

      if (fs.statSync(fullPath).isDirectory()) {

        // Create folder object and update local reference to it.
        clip = clip[docPath] = {};

        // Get source folder contents.
        var paths = fs.readdirSync(fullPath);

        paths.forEach(function (docPath) {

          var newPath = path.resolve(fullPath, docPath);

          // Copy down into the next level.
          copy.call(this, newPath, docPath, clip);

        }, this);

      } else {

        // Copy file content to clipboard.
        clip[docPath] = fs.readFileSync(fullPath, enc);

      }

    };

    if (fs.existsSync(fullPath)) {

      // Clear clipboard and create local reference to it.
      var clip = this.clipboard.files;

      // Begin deep copy.
      copy.call(this, fullPath, docPath, clip);

    }

  }, this);

  return this;

};
