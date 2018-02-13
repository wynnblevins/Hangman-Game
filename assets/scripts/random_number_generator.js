var generator = (function () {
    'use strict';

    this.generate = function (maxNumber) {
        return Math.floor((Math.random() * maxNumber) + 1);
    };

    return this;
})();