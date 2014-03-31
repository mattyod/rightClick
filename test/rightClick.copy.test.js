// Helper modules
var fs  = require('fs');

module.exports = {

  setUp: function (callback) {

    // For this test scenario the righClick method needs to be stubbed so that
    // the clipboard can be accessed by the test assertions.
    this.rightClick = function () {

      this.clipboard = {

        target: './test/sandbox/copy/from/',

        files: {}

      };

      // The tested module.
      this.copy = require('../lib/copy');

      return this;

    };

    callback();

  },

  tearDown: function (callback) {

    callback();

  },

  'copy file': function (test) {

    test.expect(2);

    this.rightClick().copy('file.txt');

    test.ok(fs.existsSync('./test/sandbox/copy/from/file.txt'),
      'The file still exists');

    test.equal(this.clipboard.files['file.txt'].toString(), 'aaa',
      'The file is available on the clipboard');

    test.done();

  },

  'copy file array': function (test) {

    test.expect(4);

    this.rightClick().copy(['file.txt', 'file2.txt']);

    test.ok(fs.existsSync('./test/sandbox/copy/from/file.txt'),
      'The file still exists');

    test.equal(this.clipboard.files['file.txt'].toString(), 'aaa',
      'The file is available on the clipboard');

    test.ok(fs.existsSync('./test/sandbox/copy/from/file2.txt'),
      'The file still exists');

    test.equal(this.clipboard.files['file2.txt'].toString(), 'ddd',
      'The file is available on the clipboard');

    test.done();
  },

  'copy folder': function (test) {

    test.expect(6);

    // Call tested module
    this.rightClick().copy('deep');

    test.ok(fs.existsSync('./test/sandbox/copy/from/deep'), false,
      'The folder still exists');

    test.ok(typeof this.clipboard.files.deep === 'object',
      'Folder object has been created on the clipboard for deep');

    test.ok(fs.existsSync('./test/sandbox/copy/from/deep/file.txt'), false,
      'The file still exists');

    test.equal(this.clipboard.files.deep['file.txt'].toString(), 'bbb',
      'The file is available on the clipboard');

    test.ok(typeof this.clipboard.files.deep.deeper === 'object',
      'Folder object has been created on the clipboard for deeper');

    test.equal(this.clipboard.files.deep.deeper['file.txt'].toString(), 'ccc',
      'The file is available on the clipboard');

    test.done();

  },

  'copy with suffix': function (test) {

    test.expect(3);

    // Call tested module
    this.rightClick().copy('mixed', ['txt', 'js']);

    test.equal(this.clipboard.files.mixed['text.txt'].toString(), 'text file\n',
      'Text (.txt) file has been copied');

    test.equal(this.clipboard.files.mixed['javascript.js'].toString(), 'console.log(\'a\');\n',
      'JavaScript (.js) file has been copied');

    test.equal(this.clipboard.files.mixed['other.rb'], undefined,
      'Other file has not been copied');

    test.done();

  }

};
