var mediaPlayer = (function () {
    'use strict';

    return {
        playSong: function (filePath) {
            var audio = new Audio(filePath);
            audio.play();
        }
    };
})();