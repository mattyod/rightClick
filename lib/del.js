var path  = require('path'),
    fs    = require('fs'),
    sep   = require('path').sep;

module.exports = function(path) {
	
	// Push single path into array object
  if(typeof path === 'string') {
    
    path = [path];
  
  }

  path.forEach(function(path) {

    var fullPath = this.clipboard.target + sep + path;
    
    var del = function(fullPath) {

      if(fs.statSync(fullPath).isDirectory()) {

        // Get source folder contents.
        var paths = fs.readdirSync(fullPath);

        paths.forEach(function(path) {

          var newPath = fullPath + sep + path;

          del(newPath);
        
        });

        // Finally delete the containing folder.
        fs.rmdirSync(fullPath);

      } else {

        fs.unlinkSync(fullPath);

      }

    };

    if(fs.existsSync(fullPath)) {
    
      del(fullPath);

    }

  });
  
	return this;

};