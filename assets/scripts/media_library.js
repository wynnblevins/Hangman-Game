var mediaLibrary = (function () {
    'use strict';

    var files = [
        {targetString: 'THE BEATLES', filename: 'beatles.mp3',  
            path: 'assets/audio/beatles.mp3', imgPath: 'assets/images/revolver.png'},
        {targetString: 'QUEEN', filename: 'queen.mp3', 
            path: 'assets/audio/queen.mp3', imgPath: 'assets/images/night_at_the_opera.png'},
        {targetString: 'PINK FLOYD', filename: 'pink_floyd.mp3', 
            path: 'assets/audio/pink_floyd.mp3', imgPath: 'assets/images/dark_side.png'},
        {targetString: 'BEE GEES', filename: 'bee_gees.mp3', 
            path: 'assets/audio/bee_gees.mp3', imgPath: 'assets/images/beegees.png'},
        {targetString: 'LED ZEPPELIN', filename: 'zeppelin.mp3', 
            path: 'assets/audio/zeppelin.mp3', imgPath: 'assets/images/ledzeppelin3.png'},
    ];

    return {        
        files: files,
        
        retrieveFilePath: function (fileNdx) {
            return files[fileNdx];
        }, 
    };
})();