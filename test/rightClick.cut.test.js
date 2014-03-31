// Helper modules
var fs      = require('fs'),
    prep    = require('../test/helpers/prep'),
    unPrep  = require('../test/helpers/unprep'),
    rightClick = require('../lib/rightClick');

// A set of files and folders to create with prep.
var prepObject = {
  './test/sandbox/cut/file.txt': 'aaa',
  './test/sandbox/cut/deep': null,
  './test/sandbox/cut/deep/file.txt': 'bbb',
  './test/sandbox/cut/deep/deeper/': null,
  './test/sandbox/cut/deep/deeper/file.txt': 'ccc',
  './test/sandbox/cut/deep/other.rb': 'xxx'
};

// Clean up object for if tests fail.
var unPrepObject = [
  './test/sandbox/cut/file.txt',
  './test/sandbox/cut/deep/deeper/file.txt',
  './test/sandbox/cut/deep/deeper/',
  './test/sandbox/cut/deep/file.txt',
  './test/sandbox/cut/deep/other.rb',
  './test/sandbox/cut/deep'
];

module.exports = {

  setUp: function (callback) {

    // Create some files to cut.
    prep('./test/sandbox/cut', prepObject);

    callback();

  },

  tearDown: function (callback) {

    // Files should be deleted but in case something went wrong...
    unPrep(unPrepObject);

    callback();

  },

  'cut file': function (test) {

    test.expect(2);

    // Call tested module.
    var that = rightClick('./test/sandbox/cut/').cut('file.txt');

    test.equal(fs.existsSync('./test/sandbox/cut/file.txt'), false,
      'The file has been deleted');

    test.equal(that.clipboard.files['file.txt'].toString(), 'aaa',
      'The file is available on the clipboard');

    test.done();

  },

  'cut folder': function (test) {

    test.expect(6);

    // Call tested module
    var that = rightClick('./test/sandbox/cut/').cut('deep');

    // N.B. Only the top level folder can be tested for deletion as attempts to
    // read deeper into an expected non existant folder structure will choke.
    // However, it can be fairly safely assumed that if the top level folder has
    // been deleted, so have it's contents.
    test.equal(fs.existsSync('./test/sandbox/cut/deep'), false,
      'The folder has been deleted');

    // But we can test what has been written to the clipboard object.
    test.ok(typeof that.clipboard.files.deep === 'object',
      'Folder object has been created on the clipboard for deep');

    test.equal(that.clipboard.files.deep['file.txt'].toString(), 'bbb',
      'The file is available on the clipboard');

    test.equal(that.clipboard.files.deep['other.rb'].toString(), 'xxx',
      'The file is available on the clipboard');

    test.ok(typeof that.clipboard.files.deep.deeper === 'object',
      'Folder object has been created on the clipboard for deeper');

    test.equal(that.clipboard.files.deep.deeper['file.txt'].toString(), 'ccc',
      'The file is available on the clipboard');

    test.done();

  },

  'cut with suffix': function (test) {

    test.expect(2);

    // Call tested module
    var that = rightClick('./test/sandbox/cut/').cut('deep', ['txt']);

    test.equal(that.clipboard.files.deep['file.txt'].toString(), 'bbb',
      'The file is available on the clipboard');

    test.equal(that.clipboard.files.deep['other.rb'], undefined,
      'The file has not been cut');

    test.done();
  }

};
