(function () {
    'use strict';
    
    this.playSong = function (filePath) {
        var audio = new Audio(filePath);
        audio.play();
    };

    return this;
})();