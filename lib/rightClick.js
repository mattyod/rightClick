var fs = require('fs');

module.exports = function(location) {

    this.clipboard = {
    
      target: location,

      files: {}

    };
    
    this.copy = require('../lib/copy');
    
    this.paste = require('../lib/paste');
    
    this.del = require('../lib/del');

    this.cut = require('../lib/cut');
    
    // If passed a valid path.
    if(fs.existsSync(location)) {

      // Set location as current clipboard target.
      this.clipboard.target = location;

      // Return self for chaining
      return this;

    } else {

      // Throw an error to prevent unintended results.
      throw new Error(location + ' not found');

    }

};
