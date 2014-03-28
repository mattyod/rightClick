// Helper modules
var unPrep  = require('../test/helpers/unprep'),
    fs      = require('fs');

// Files to unPrep (delete). N.B. We start at the deepest file as unPrep isn't
// a particularly intelligent file deleter.
var unPrepObject = [
  './test/sandbox/paste/deep/deeper/file.txt',
  './test/sandbox/paste/deep/deeper',
  './test/sandbox/paste/deep/file.txt',
  './test/sandbox/paste/deep',
  './test/sandbox/paste/file.txt'
];

module.exports = {

  setUp: function (callback) {

    // For this test scenario the righClick method needs to be stubbed so that
    // the clipboard can be preloaded and paste() tested in isolation.
    this.rightClick = function () {

      this.clipboard = {

        target: '',

        files: {
          'file.txt': 'aaa',
          'deep': {
            'file.txt': 'bbb',
            'deeper': {
              'file.txt': 'ccc'
            }
          }
        }

      };

      // The tested module.
      this.paste = require('../lib/paste');

      return this;

    };

    // Ensure that the expected files do not exist already.
    unPrep(unPrepObject);

    callback();

  },

  tearDown: function (callback) {

    // Clean up pasted files
    unPrep(unPrepObject);

    callback();

  },

  paste: function (test) {
    test.expect(11);

    // Call tested method.
    this.rightClick().paste('./test/sandbox/paste');

    test.ok(fs.existsSync(unPrepObject[0]),
      'file.txt has been pasted');

    test.strictEqual(fs.readFileSync(unPrepObject[0], 'binary'), 'ccc',
      'file.txt has expected text');

    test.ok(fs.existsSync(unPrepObject[1]),
      'deep has been pasted');

    test.ok(fs.existsSync(unPrepObject[2]),
      'deep/file.txt has been pasted');

    test.strictEqual(fs.readFileSync(unPrepObject[2], 'binary'), 'bbb',
      'deep/file.txt has expected text');

    test.ok(fs.existsSync(unPrepObject[3]),
      'deep/deeper has been pasted');

    test.ok(fs.existsSync(unPrepObject[4]),
      'deep/deeper/file.txt has been pasted');

    test.strictEqual(fs.readFileSync(unPrepObject[4], 'binary'), 'aaa',
      'deep/deeper/file.txt has expected text');

    // Redefining rightClick clipboard for force
    this.rightClick = function () {

      this.clipboard = {

        target: '',

        files: {
          'file.txt': 'foo',
          'deep': {
            'file.txt': 'bar',
            'deeper': {
              'file.txt': 'baz'
            }
          }
        }

      };

      // The tested module.
      this.paste = require('../lib/paste');

      return this;

    };

    // Call tested method with force.
    this.rightClick().paste('./test/sandbox/paste', true);

    test.strictEqual(fs.readFileSync(unPrepObject[0], 'binary'), 'baz',
      'file.txt has been over written with force');

    test.strictEqual(fs.readFileSync(unPrepObject[2], 'binary'), 'bar',
      'deep/file.txt has been over written with force');

    test.strictEqual(fs.readFileSync(unPrepObject[4], 'binary'), 'foo',
      'deep/deeper/file.txt been over written with force');

    test.done();

  }

};
