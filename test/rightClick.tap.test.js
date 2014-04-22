
module.exports = {

  setUp: function (callback) {

    this.rightClick = function () {

      this.clipboard = {

        target: '',

        files: {
          'thing': false
        }
      };

      this.tap = require('../lib/tap');

      return this;
    };

    callback();

  },

  tearDown: function (callback) {

    callback();

  },

  tap: function (test) {

    this.rightClick().tap(function () {
      this.clipboard.thing = true;
    });

    test.ok(this.clipboard.thing,
      'thing set to true');

    test.done();
  },

  tapWithArguments: function (test) {
    var ans, func = function (a, b) {
      ans = a + b;
    };

    this.rightClick().tap(func, 1, 2);

    test.equal(ans, 3,
      'function accepted given arguments');

    test.done();
  }

};
