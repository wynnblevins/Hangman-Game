var mediaLibrary = (function () {
    'use strict';

    var files = [
        {targetString: 'THE BEATLES', filename: 'beatles.mp3',  
            path: 'assets/audio/beatles.mp3', puzzleString: '___ _______'},
        {targetString: 'QUEEN', filename: 'queen.mp3', 
            path: 'assets/audio/queen.mp3', puzzleString: '_____'},
        {targetString: 'PINK_FLOYD', filename: 'pink_floyd.mp3', 
            path: 'assets/audio/pink_floyd.mp3', puzzleString: '____ _____'},
        {targetString: 'bee gees', filename: 'bee_gees.mp3', 
            path: 'assets/audio/pink_floyd.mp3', puzzleString: '___ ____'},
        {targetString: 'led zeppelin', filename: 'zeppelin.mp3', 
            path: 'assets/audio/zeppelin.mp3', puzzleString: '___ ________'},
    ];

    return {        
        files: files,
        
        retrieveFilePath: function (fileNdx) {
            return files[fileNdx];
        }, 
    };
})();