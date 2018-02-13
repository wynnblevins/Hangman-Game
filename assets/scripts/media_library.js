(function () {
    'use strict';

    this.files = [
        {targetString: 'the beatles', filename: 'beatles.mp3', path: 'assets/audio/beatles.mp3'},
        {targetString: 'queen', filename: 'queen.mp3', path: 'assets/audio/queen.mp3'},
        {targetString: 'pink floyd', filename: 'pink_floyd.mp3', path: 'assets/audio/pink_floyd.mp3'},
        {targetString: 'bee gees', filename: 'bee_gees.mp3', path: 'assets/audio/pink_floyd.mp3'},
        {targetString: 'led zeppelin', filename: 'zeppelin.mp3', path: 'assets/audio/zeppelin.mp3'}
    ];

    this.retrieveFilePath = function (fileNdx) {
        return this.files[fileNdx];
    };

    return this;
})();