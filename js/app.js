/* app.js to perform basic DOM selection, add event handlers, and to reset the game when it ends */

let game;

/* resetDisplay(): this function hides the start screen overlay. */

function resetDisplay(){
    $('div#overlay').hide();
}

/* markButton(): this function is called when a player selects a letter. It disables the button on the onscreen
 keyboard and calls the handleInteraction() method of the Game class. */

function markButton(key,e) {
    $(`.key:contains("${key}")`).prop('disabled', true);
    game.handleInteraction(key, e);
}

/* Add an event listener to the "Start Game" button which calls the resetDisplay() function, creates a new Game
 object, and starts the game. */
$(document).on('click','#btn__reset',() => {
    resetDisplay();
    game = new Game(["Thank You", "Black Zebra", "I Love Ducks"]);
    game.startGame();
});

/* Add event listeners to each of the keyboard buttons, so that clicking a button calls the markButton() function. */
$(document).on('click', '.key', (e) => markButton(e.target.textContent,e));

/* keypress listener for exceeds grade */
$(document).on('keypress', (e) => {
    if (!game) return null;
    if (e.keyCode>96 || e.keyCode<123){
        if (!$(`.key:contains("${String.fromCharCode(e.keyCode)}")`).prop('disabled')){
            markButton(String.fromCharCode(e.keyCode),e);
        }
    }
});