var hangmanGame = (function (rand_generator, mediaLibrary) {
    'use strict';
    
    var target;
    var guessThreshold = 5; // number of incorrect guesses allowed
    var remainingGuesses = guessThreshold;

    function getMatchIndices(targetWord, guessLetter) {
        var ndxs = [];
        
        for (var i = 0; i < targetWord.length; i++) {
            if (targetWord[i] === guessLetter) {
                ndxs.push(i);
            }
        }

        return ndxs;
    }

    return {
        getRemainingGuesses: function () {
            return remainingGuesses;
        },
        
        setRemainingGuesses: function (guesses) {
            remainingGuesses = guesses;
        },

        initGame: function () {
            // Represents however many files are in project's media library
            var NUMBER_OF_FILES = 5;

            // pick a random number
            var fileNdx = rand_generator.generate(NUMBER_OF_FILES);

            // use random number to pick a file
            target = mediaLibrary.retrieveFilePath(fileNdx);

            // figure out how many guesses the user will get
            remainingGuesses = target.targetString.length + guessThreshold;
        },

        keystrokeDetected: function () {
            remainingGuesses -= 1;
        },

        playGame: function () {
            this.initGame();
        },

        guessIsMatch: function (guess) {
            var ndxs = getMatchIndices(target.targetString, guess);
            if (ndxs.length !== 0) {
                alert("match found!");
            }
        }
    }; 
})(rand_generator, mediaLibrary);