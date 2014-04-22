module.exports = function (callback) {
  var args = Array.prototype.slice.call(arguments).slice(1);

  callback && callback.apply(this, args);

  return this;
};
