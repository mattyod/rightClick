'use strict';

var rightClick = require('./lib/rightClick.js'),
    fs = require('fs');

module.exports = (function () {
    var target = './sandbox/copyFrom',
        file = 'testfile.txt',
        out = './sandbox/out';

    console.log(rightClick(target, 'utf8')
      .copy(fs.readdirSync(target)).clipboard);

    rightClick(target, 'utf8').copy(fs.readdirSync(target)).tap(function () {
        console.log('tap', this.clipboard);
        return this;
    }).paste(out);

})();
