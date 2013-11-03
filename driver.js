'use strict';

var rightClick = require('./lib/rightClick.js');

module.exports = (function () {
    var target = './sandbox/copyFrom',
        file = 'testfile.txt',
        out = './sandbox/out';

    //console.log(rightClick(target).copy(file).clipboard);

    rightClick(target).copy(file).paste(out);

})();