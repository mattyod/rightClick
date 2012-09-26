var path  = require('path'),
    fs    = require('fs');

module.exports = function(path) {
  
  this.copy(path).del(path);

	return this;

};