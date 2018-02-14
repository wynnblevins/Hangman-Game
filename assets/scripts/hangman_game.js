var hangmanGame = (function (rand_generator, mediaLibrary) {
    'use strict';
    
    var target;
    var guessThreshold = 6; // number of incorrect guesses allowed
    var remainingGuesses = guessThreshold;
    var guesses = 0;
    
    function getMatchIndices(targetWord, guessLetter) {
        var ndxs = [];
        var targetWord = targetWord.toUpperCase();
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

            // create game board
            for (var i = 0; i < target.targetString.length; i++) {
                if (target.targetString[i] !== ' ') {
                    // create a span for each character in puzzle and fill with an underscore
                } else { // character is a space
                    // put a span with an empty space on puzzle board
                }
            }
        },

        keystrokeDetected: function () {
            guesses += 1;
            
            $('#scaffold').attr('src', 'assets/images/ScaffoldStrike' + guesses + '.png');
        },

        playGame: function () {
            this.initGame();
        },

        guessIsMatch: function (guess) {
            var ndxs = getMatchIndices(target.targetString, guess);
            if (ndxs.length !== 0) {
                console.log(ndxs);
            }
        }
    }; 
})(rand_generator, mediaLibrary);