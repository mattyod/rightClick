module.exports = function (docPath) {

  this.copy(docPath).del(docPath);

  return this;

};
