var mediaLibrary = (function () {
    'use strict';

    var files = [
        {targetString: 'THE BEATLES', filename: 'beatles.mp3',  
            path: 'assets/audio/beatles.mp3'},
        {targetString: 'QUEEN', filename: 'queen.mp3', 
            path: 'assets/audio/queen.mp3'},
        {targetString: 'PINK FLOYD', filename: 'pink_floyd.mp3', 
            path: 'assets/audio/pink_floyd.mp3'},
        {targetString: 'BEE GEES', filename: 'bee_gees.mp3', 
            path: 'assets/audio/pink_floyd.mp3'},
        {targetString: 'LED ZEPPELIN', filename: 'zeppelin.mp3', 
            path: 'assets/audio/zeppelin.mp3'},
    ];

    return {        
        files: files,
        
        retrieveFilePath: function (fileNdx) {
            return files[fileNdx];
        }, 
    };
})();