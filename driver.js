'use strict';

var rightClick = require('./lib/rightClick.js'),
    fs = require('fs');

module.exports = (function () {
    var target = './sandbox/copyFrom',
        file = 'testfile.txt',
        out = './sandbox/out';

    var config = { foo: 'bar' };
    var test = function (config) {
        console.log('passed', config);
    };

    rightClick(target, 'utf8')
      .copy(fs.readdirSync(target), ['txt', 'js'])
      .tap(test, config);

    rightClick(target, 'utf8').copy(fs.readdirSync(target)).tap(function () {
        console.log('tap', this.clipboard);
        return this;
    }).paste(out);

})();
