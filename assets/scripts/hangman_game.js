var hangmanGame = (function (rand_generator, mediaLibrary, mediaPlayer) {
    'use strict';
    
    var target;
    var guessThreshold = 7; // number of incorrect guesses allowed
    var guessedLetters = [];
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
            var uppercaseChar = String.fromCharCode(event.which).toUpperCase();
            var ndxs = getMatchIndices(target.targetString, uppercaseChar);
            
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
        
                guessedLetters.push(uppercaseChar);
                $('#guessedLetters').text(guessedLetters.toString());         
            }            

            // check if game is lost/won
            if (strikes >= guessThreshold) {
                alert('You LOSE!');
                this.initGame();

            } else if (allLettersRevealed()) {
                // user has beaten the puzzle
                ++winsCount;
                
                // TODO: Update wins count on interface
                var wins = $('#winsCount');
                wins[0].innerHTML = winsCount;
                
                mediaPlayer.playSong(target.path);
                $('album-cover').attr('src', target.imgPath);
            }
        },

        initGame: function () {
            // Represents however many files are in project's media library
            var NUMBER_OF_FILES = 5;

            // pick a random number
            var fileNdx = rand_generator.generate(NUMBER_OF_FILES);

            // use random number to pick a file
            mediaPlayer.stopSong();
            target = mediaLibrary.retrieveFilePath(fileNdx);
            mediaPlayer.init(target.path);

            strikes = 0;

            // make sure the board is clear
            $('#currentPuzzleBox').empty();
            $('#guessedLetters').empty();
            var $scaffold = $('img#scaffold');
            $scaffold.attr('src', 'assets/images/ScaffoldStrike' + strikes + '.png');

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

        guessIsMatch: function (guess) {
            var ndxs = getMatchIndices(target.targetString, guess);
            if (ndxs.length !== 0) {
                return true;
            }
            else {
                return false;
            }
        },

        resetWinsCount: function () {
            winsCount = 0;
            var winsCountP = $('#winsCount');
            winsCountP[0].innerHTML = winsCount;
            this.resetGuessedLetters();
        },

        resetGame: function () {
            strikes = 0;         
            this.resetGuessedLetters();
            this.initGame();
            var $scaffold = $('img#scaffold');
            $scaffold.attr('src', 'assets/images/ScaffoldStrike' + strikes + '.png');
        },

        resetGuessedLetters: function () {
            guessedLetters = [];
        }
    }; 
})(rand_generator, mediaLibrary, mediaPlayer);

$('body').keypress(function (event) {
    hangmanGame.onKeyPress(event); 
});

$("#resetBtn").click(function() {
    hangmanGame.resetGame();
    hangmanGame.resetWinsCount();
});

$('#nextBtn').click(function () {
    hangmanGame.resetGame();
    hangmanGame.initGame();    
});

hangmanGame.initGame();