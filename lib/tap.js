module.exports = function (callback) {
    callback && callback.call(this);

    return this;
};
