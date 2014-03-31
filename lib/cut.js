module.exports = function (docPath, suffix) {

  this.copy(docPath, suffix).del(docPath);

  return this;

};
