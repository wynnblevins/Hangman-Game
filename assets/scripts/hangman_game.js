(function (generator, mediaLibrary) {
    'use strict';

    this.targetString = '';

    this.initGame = function () {
        // pick a random number
        var fileNdx = generator.generate();

        // use random number to pick a file
        this.targetString = mediaLibrary.retrieve(fileNdx);
    };

    this.playGame = function () {
        this.initGame();
    };
})(generator, mediaLibrary);