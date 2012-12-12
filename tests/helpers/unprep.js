var fs = require('fs');

module.exports = function(files) {
  
  files.forEach(function(file) {

    if(fs.existsSync(file)) {

      if(fs.statSync(file).isDirectory()) {

        fs.rmdirSync(file);

      } else {

        fs.unlinkSync(file);

      }
    }

  });
};