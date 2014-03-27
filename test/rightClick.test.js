// Tested module
var rightClick = require('../lib/rightClick');

module.exports = {

  setUp: function (callback) {

    callback();

  },

  tearDown: function (callback) {

    callback();

  },

  rightClick: function (test) {

    test.expect(7);

    var path = './test/sandbox';

    test.strictEqual(rightClick(path).clipboard.target, path,
      'Clipboard target set');

    test.ok(typeof rightClick(path).cut === 'function',
      'Cut module loaded');

    test.ok(typeof rightClick(path).copy === 'function',
      'Copy module loaded');

    test.ok(typeof rightClick(path).paste === 'function',
      'Paste module loaded');

    test.ok(typeof rightClick(path).del === 'function',
      'Del module loaded');

    test.ok(typeof rightClick(path).tap === 'function',
      'Tap module loaded');

    test.ok(function () {rightClick('./test/notFolder'); },
      'Returns false when passed a non existant path');

    test.done();

  }
};
