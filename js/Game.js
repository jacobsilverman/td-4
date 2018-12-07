/* Game.js to create a Game class with methods for starting and ending the game, handling interactions, getting
 random phrases, checking for a win, and removing a life counter. */

/*
        Create the Game class in the Game.js file.
*/

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Game {
    /*
        The class should include a constructor with the following properties: (1) missed: used to track the number of
        missed guesses by the player. (2) phrases: an array of phrases to use with the game (you'll use a method to
        create new instances of the Phrase class). A phrase should only include letters and spaces — no numbers,
        punctuation or other special characters.
    */
    constructor(missed, phrases){
        this.missed = missed;
        this.phrases = [
            "Dccddee",
            "Abba",
            "ffghijj"
        ];
        this.myPhrase = '';
        this.phraseObject = '';
        this.life = 4;
        this.started = 0;
    }
    /*
     The class should also have these methods:
     stored in the phrases array. (2) handleInteraction(): this method checks to see if the button clicked by the
     player matches a letter in the phrase. If it does not, then call the removeLife() method.. If the selected letter
     matches, call the showMatchedLetter() method on the phrase and then call the checkForWin() method. (3) removeLife():
     this method removes a life, removes a heart from the board, and, if the player is out of lives, ends the game.
     (4) checkForWin(): this method checks to see if the player has selected all of the letters. (5) gameOver():
     this method displays a message if the player wins or a different message if they lose. (6) startGame(): calls
     the getRandomPhrase() method, and adds that phrase to the board by calling the Phrase class'
     addPhraseToDisplay() method.
     */

    /* getRandomPhrase(): this method randomly retrieves one of the phrases */
    getRandomPhrase(){
        return this.phrases[getRandomInt(this.phrases.length)];
    }
    handleInteraction(e){
        let keyPressed = '';
        let correct = false;
        // console.log(e.type);
        if (e.type === 'click'){
            correct = this.determineCorrectness(e.target.textContent);
            if (correct){
                console.log('correct screen ', $(e.target))
                $(e.target).prop('disabled',true).addClass('chosen');
            } else {
                console.log('incorrect screen ', $(e.target))
                $(e.target).prop('disabled',true).addClass('wrong');
            }
        } else if (e.type === 'keypress'){
            correct = this.determineCorrectness(
                String.fromCharCode(e.keyCode)
            );
            if (correct){
                $(`.key:contains("${String.fromCharCode(e.keyCode)}")`)
                    .prop('disabled',true).addClass('chosen');
            } else {
                $(`.key:contains("${String.fromCharCode(e.keyCode)}")`)
                    .prop('disabled',true).addClass('wrong');
            }
        } else {
            console.log('some error')
        }
    }
    removeLife(){
        if (this.life > 0){
            this.life = this.life - 1;
            $('li.tries').eq((this.life-1)).hide()
            return;
        }
        this.gameOver();
    }
    checkForWin(){
        if ($('li.letter.hide').length > 0){
            return;
        }
        //did not use the 'win a' css class because h1 not an a tag
        $('h1#game-over-message').text('Congratulations you win!');
        $('button#btn__reset').text('Reset');
        $('div#overlay').show().addClass('win');
        this.started = 0;
    }
    gameOver(){
        //did not use the 'lose a' css class because h1 not an a tag
        $('h1#game-over-message').text('Game Over');
        $('button#btn__reset').text('Reset');
        $('div#overlay').show().addClass('lose');
        this.started = 0;

    }
    startGame(){
        this.started = 1;
        this.life = 4;
        this.myPhrase = this.getRandomPhrase().toLowerCase();
        this.phraseObject = new Phrase(this.myPhrase);
        this.phraseObject.addPhraseToDisplay(this.myPhrase);
    }
    // extra methods
    determineCorrectness(keyPressed){
        let indexsOfLetter = this.phraseObject.checkLetter(keyPressed);
        if (indexsOfLetter.length === 0){
            this.removeLife();
            return false;
        } else {
            this.phraseObject.showMatchedLetter(keyPressed);
            this.checkForWin();
            return true;
        }
    }

}


