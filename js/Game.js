/* Game.js to create a Game class with methods for starting and ending the game, handling interactions, getting
 random phrases, checking for a win, and removing a life counter. */
let phrase;

/* helper function for getRandomPhrase */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Game {
    constructor(phrases){
        this.missed = 4;
        this.phrases = phrases;
    }

    /* getRandomPhrase(): this method randomly retrieves one of the phrases */
    getRandomPhrase(){
        return this.phrases[getRandomInt(this.phrases.length)]
    }

/* handleInteraction(): this method checks to see if the button clicked by the player matches a letter in the phrase. */
    handleInteraction(key, e){
        if (phrase.checkLetter(key).length === 0){
            $(`.key:contains("${key}")`).addClass('wrong');
            /* If it does not, then call the removeLife() method. */
            this.removeLife();
        } else {
            $(`.key:contains("${key}")`).addClass('chosen');
            phrase.showMatchedLetter(key);
            /* If the selected letter matches, call the showMatchedLetter() method on the phrase and then call the
             checkForWin() method. */
            this.checkForWin();
        }
    }
    /* removeLife(): this method removes a life, removes a heart from the board, and, if the player is out of lives,
     ends the game. */
    removeLife(){
        if (this.missed > 0) {
            this.missed = this.missed - 1;
            $('li.tries').eq((this.missed-1)).hide();
            return;
        }
        this.gameOver('lose');
    }
    /* checkForWin(): this method checks to see if the player has selected all of the letters. */
    checkForWin(){
        if ($('li.letter.hide').length > 0) return;
        this.gameOver('win');
    }
    /* gameOver(): this method displays a message if the player wins or a different message if they lose. */
    gameOver(caller){
        if (caller === 'win'){
            $('h1#game-over-message').text('Congratulations you win!');
            $('div#overlay').show().addClass('win').css('background-color', '#78CF82');
            // --color-win: #78CF82;
            // --color-lose: #D94545;
        } else if (caller === 'lose'){
            $('h1#game-over-message').text('Game Over');
            $('div#overlay').show().addClass('lose').css('background-color','#D94545');
        }
        //reset here for exceeds expectations
        $( ".key" ).each(function() {
            if ($(this).hasClass('chosen')) {
                $(this).removeClass('chosen').prop('disabled', false);
            }
            if ($(this).hasClass('wrong')) {
                $(this).removeClass('wrong').prop('disabled', false);
            }
        });
        $('li.tries').show();
        //did not use the 'lose a' css class because h1 not an a tag
        $('button#btn__reset').text('Reset');

    }
    /* startGame(): calls the getRandomPhrase() method, and adds that phrase to the board by calling the Phrase
     class' addPhraseToDisplay() method. */
    startGame(){
        const myPhrase = this.getRandomPhrase().toLowerCase();
        phrase = new Phrase(myPhrase);
        phrase.addPhraseToDisplay(myPhrase);
    }
}


