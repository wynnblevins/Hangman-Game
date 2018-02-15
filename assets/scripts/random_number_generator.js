var rand_generator = (function () {
    'use strict';

    return {
        generate: function (maxNumber) {
            return Math.floor((Math.random() * maxNumber));
        }
    };
})();