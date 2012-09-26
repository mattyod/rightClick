// It may seem perverse but the prep file shouldn't use any of the rightClick
// functionality, so here files are written out in a verbose manner so that
// there is a reasonable level of comfort that any failures within the tests do
// not allow the tests themselves to pass.

var fs = require('fs'),
    _  = require('underscore');


// TODO: throw an error if files already exist?
module.exports = function(location, files) {
  
  if(fs.existsSync(location)) {

    // Itterate the files array and write out each member
    _.each(files, function(content, name) {
      
      if(!fs.existsSync(name)) {
        // It's a folder
        if(!content) {

          fs.mkdirSync(name);

        } else {

          // It's a file
          fs.writeFileSync(name, content);

        }
      }

    });
  }

};