var hangmanGame = (function (rand_generator, mediaLibrary) {
    'use strict';
    
    var target;
    var guessThreshold = 7; // number of incorrect guesses allowed
    var guessedLetters = [];
    var remainingGuesses = guessThreshold;
    var guesses = 0;
    var winsCount = 0;
    var strikes = 0;

    function allLettersRevealed() {
        var spans = $('div#currentPuzzleBox > span');
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].innerHTML === '_') {
                return false;
            }
        }

        return true;
    }

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
                    var spans = $('div#currentPuzzleBox > span');
                    
                    for (var j = 0; j < target.targetString.length; j++) {
                        if (target.targetString[j] === uppercaseChar) {
                            spans[j].innerHTML = uppercaseChar;
                        }
                    }
                }    
            } else {  // user guessed an incorrect letter
                strikes = strikes + 1;
                var $scaffold = $('img#scaffold');
                $scaffold.attr('src', 'assets/images/ScaffoldStrike' + strikes + '.png');
        
                if (strikes === 0) {
                    $('#guessedLetters').text(char);
                }
                else {
                    $('#guessedLetters').text(', ' + char);
                }         
            }            

            // QUESTION: HOW DO I TIME THIS TO RUN AFTER THE LAST IMAGE HAS LOADED?
            // check if game is lost/won
            if (strikes >= guessThreshold) {
                // user has run out of guesses

                // TODO: SHOW LOSER MESSAGE AFTER THE LAST IMAGE HAS LOADED
                alert('you suck!');

                this.resetGame();
            } else if (allLettersRevealed()) {
                // user has beaten the puzzle
                ++winsCount;

                alert('u win!');
                
                // TODO: Update wins count on interface
                var wins = $('#winsCount');
                wins[0].innerHTML = winsCount;
                
                this.resetGame();
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
        },

        resetGame: function () {
            var strikes = 0;
            $('#currentPuzzleBox').empty();
            this.initGame();

            var $scaffold = $('img#scaffold');
            $scaffold.attr('src', 'assets/images/ScaffoldStrike' + strikes + '.png');
            
            var winsCountP = $('#winsCount');
            winsCountP[0].innerHTML = '';
        }
    }; 
})(rand_generator, mediaLibrary);

$('body').keypress(function (event) {
    hangmanGame.onKeyPress(event); 
});

$("#resetBtn").click(function() {
    hangmanGame.resetGame();
});