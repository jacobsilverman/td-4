/* app.js to perform basic DOM selection, add event handlers, and to reset the game when it ends */

const game = new Game();


/*
* resetDisplay(): this function hides the start screen overlay. I chose to add resets for the keys and
* tries/lives/hearts for each game here because they involve direct DOM manipulation and I am re-using the
* btn__reset from get started for reset. I think replacing and re-using existing buttons is better UI/UX than
* creating new buttons.
* */
function resetDisplay(){
    $('div#overlay').hide();
    $( ".key" ).each(function() {
        if ($( this ).hasClass('chosen')){
            $( this ).removeClass('chosen').prop('disabled',false);
        }
        if ($( this ).hasClass('wrong')){
            $( this ).removeClass('wrong').prop('disabled',false);
        }
    });
    $('li.tries').show();
}

/* markButton(): this function is called when a player selects a letter. It disables the button on the onscreen
 keyboard and calls the handleInteraction() method of the Game class. I don't understand why this is in app.js and
  not in the Game */

function markButton(){

}



$(document).on('click', '.key', function (e) {
    game.handleInteraction(e);
});

$(document).on('click','#btn__reset', function(e){
    resetDisplay();
    game.startGame();
});

$(document).on('keypress', function(e){
    if(game.started === 0){
        return null;
    }
    if (e.keyCode>96 || e.keyCode<123){
        game.handleInteraction(e);
    }
    // else do nothing
});
