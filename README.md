# rightClick [![Build Status](https://secure.travis-ci.org/mattyod/rightClick.png)](http://travis-ci.org/mattyod/rightClick)

Deep cut, copy, paste & delete fuctionality for Node.js.

## About

rightClick attempts to emulate the expected behaviour of mouse interactions
with file systems in a programatic way. Namely cut, copy, paste & delete.

## Installation

    npm install rightclick

## API

### rightClick()

Select root folder for copy and cut operations and optionally determine encoding for copy.

    rightClick('./', 'utf8');

### cut()

To deep cut from the file system use:

    rightClick('./myParentFolder').cut('myDesiredFileOrFolder');

This will write the full contents and structure of your target to righClick's
clipboard and delete the file(s) and or folder(s) from the file system.

The argument passed to cut() can be either a string or an array of strings,
such as:

    rightClick('./folder').cut(['file.js', 'folder', 'otherFile.md']);

### copy()

To deep copy from the file system use:

    rightClick('./myParentFolder').copy('myDesiredFileOrFolder');

This will write the full contents and structure of your target to rightClick's
clipboard.

The argument passed to copy() can be either a string or an array of strings,
such as:

    rightClick('./folder').copy(['file.js', 'folder', 'otherFile.md']);

### paste()

To deep paste to the file system, usually in conjunction with copy() or cut()
use:

    rightClick('./myParentFolder').copy('myFolder').paste('myNewDestination');

This will copy the entire contents of the clipboard to the target folder which
must exist.

As of version 0.5.0 paste now accepts an optional force boolean. This will allow you to paste over existing folders. i.e.

    rightClick('./myParentFolder').copy('myFolder').paste('myNewDestination', true);

### del()

To deep delete from the file system use:

    rightClick('./myParentFolder').del('myDesiredFileOrFolder');

This will delete the full contents and structure of a target folder or simply
delete a file if that is the target. This is **not** reversable and nothing is
written to the clipboard. Use with caution and certainty.

### tap()

Tap allows you to insert your own methods as callbacks within rightClick's method chain. Callbacks are initiated within rightClick's
scope.

To log out the clipboard you could do something like:

```
  rightClick('./folder')
    .copy('things')
    .tap(function () {
      console.log(this.clipboard);
    })
    .paste('./target');
```

## Licence

[MIT](https://github.com/mattyod/rightclick/blob/master/LICENSE)
