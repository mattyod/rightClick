var fs    = require('fs'),
    path   = require('path');

module.exports = function (docPath) {

  // Push single path into array object
  if (typeof docPath === 'string') {

    docPath = [docPath];

  }

  docPath.forEach(function (docPath) {

    var fullPath = path.resolve(this.clipboard.target, docPath);

    var del = function (fullPath) {

      if (fs.statSync(fullPath).isDirectory()) {

        // Get source folder contents.
        var paths = fs.readdirSync(fullPath);

        paths.forEach(function (docPath) {

          var newPath = path.resolve(fullPath, docPath);

          del(newPath);

        });

        // Finally delete the containing folder.
        fs.rmdirSync(fullPath);

      } else {

        fs.unlinkSync(fullPath);

      }

    };

    if (fs.existsSync(fullPath)) {

      del(fullPath);

    }

  });

  return this;

};
