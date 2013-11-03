module.exports = function (path) {

  this.copy(path).del(path);

  return this;

};