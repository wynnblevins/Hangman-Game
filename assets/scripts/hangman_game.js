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
        onKeyPress: function (event) {
            var char = String.fromCharCode(event.which); 
            var uppercaseChar = char.toUpperCase();
            var ndxs = getMatchIndices(target.targetString, uppercaseChar);
            var $div = $('div#currentPuzzleBox');
            
            // if we have a match
            if (ndxs.length) {
                // loop through all indexes in list of matching indexs
                for (var i = 0; i < ndxs.length; i++) {
                    // set value of span at index in target.targetString to uppercaseChar
                    // NOTE TO SELF: THIS IS THE LINE NOT WORKING AS EXPECTED
                    $('div#currentPuzzleBox > span:eq(' + i + ')').innerHTML = uppercaseChar; 
                }    
            } else {
                ++strikes;
                var $scaffold = $('img#scaffold');
                $scaffold.attr('src', 'assets/images/ScaffoldStrike' + strikes + '.png');
            }            
        },

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
                    var $puzzleBox = $('div#currentPuzzleBox');
                    $puzzleBox.append('<span class="puzzle-span">_</span>');
                } else { // character is a space
                    // put a span with an empty space on puzzle board
                    $('#currentPuzzleBox').append('<span class="puzzle-span space-span"> </span>');
                }
            }
        },
        
        playGame: function () {
            this.initGame();
        },

        guessIsMatch: function (guess) {
            var ndxs = getMatchIndices(target.targetString, guess);
            if (ndxs.length !== 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }; 
})(rand_generator, mediaLibrary);

var strikes = 0;
$('body').keypress(function (event) {
    hangmanGame.onKeyPress(event); 
});