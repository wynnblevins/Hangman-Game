var appendString = '';
var currentGameValue;

hangmanGame.initGame();

function keyWasPressed () {
    currentGameValue = currentGameValue || '';
    var input = document.getElementById('guessInput').value;
    
    // reset input after it has received a guess
    document.getElementById('guessInput').value = '';
    input = input.toUpperCase();
    
    if (hangmanGame.guessIsMatch(input)) {
        guessedLetterIsMatch(input, targetWord);
    }

    // if statement helps format commas in the string
    // if this is the first key stroke, dont append a comma
    if (!currentGameValue.length) {
        currentGameValue = input;
    } else {
        currentGameValue = currentGameValue + ', ' + input;
    }
    
    var guessedLetters = document.getElementById('guessedLetters');
    guessedLetters.innerHTML = currentGameValue;
} 