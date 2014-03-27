// Tested module
// Actually del() is the tested module but rightClick() will load it.
var rightClick = require('../lib/rightClick');

// Helper modules
var fs    = require('fs'),
    prep  = require('../test/helpers/prep');

module.exports = {

  setUp: function (callback) {

    // A set of files and folders to create with prep.
    var prepObject = {
      './test/sandbox/del/file.text': 'top level text file',
      './test/sandbox/del/deep': null,
      './test/sandbox/del/deep/file.txt': 'second level text file',
      './test/sandbox/del/deep/deeper/': null,
      './test/sandbox/del/deep/deeper/file.txt': 'third level text file'
    };

    // Create some files to delete.
    prep('./test/sandbox/del', prepObject);

    callback();

  },

  tearDown: function (callback) {

    callback();

  },

  'delete file': function (test) {

    test.expect(1);

    // Call tested module.
    rightClick('./test/sandbox/del').del('file.txt');

    test.equal(fs.existsSync('./test/sandbox/del/file.txt'), false,
      'File has been deleted');

    test.done();

  },

  'delete folder': function (test) {

    test.expect(4);

    // Call tested module
    rightClick('./test/sandbox/del').del('deep');

    test.equal(fs.existsSync('./test/sandbox/del/deep/deeper/file.txt'), false,
      'File in sub folder has been deleted');

    test.equal(fs.existsSync('./test/sandbox/del/deep/deeper'), false,
      'Sub folder has been deleted');

    test.equal(fs.existsSync('./test/sandbox/del/deep/file.txt'), false,
      'File in folder has been deleted');

    test.equal(fs.existsSync('./test/sandbox/del/deep'), false,
      'Folder has been deleted');

    test.done();

  }

};
