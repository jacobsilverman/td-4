
/* Phrase.js to create a Phrase class to handle the creation of phrases */

/* helper function for addPhraseToDisplay method */
function isLetter(input) {
    // card number must be number
    var regex = /^[a-zA-Z]+$/;
    return regex.test(input);
}

class Phrase {
    constructor(phrase){
        this.phrase = phrase;
    }
    /* addPhraseToDisplay(): this adds letter placeholders to the display when the game starts. */
    addPhraseToDisplay(){
        let reducedPhraseArray = this.phrase.split('').reduce((sum, cur) => {
            if(isLetter(cur)){
                sum.push('<li class=\"hide letter ' + cur.toLowerCase() + '\">'+ cur + '</li>');
            }
            if(cur.localeCompare(' ') === 0){
                sum.push('<li class=\"hide space\"></li>');
            }
            return sum;
        },[]);
        reducedPhraseArray.unshift('<div id=\"phrase\" class=\"section\">','<ul>');
        reducedPhraseArray.push('</ul>','</div>');
        $('div#phrase').replaceWith(reducedPhraseArray.join(''));
    }

    /* checkLetter(): checks to see if letter selected by player matches a letter in the phrase. */
    checkLetter(letter){
        return this.phrase.split('').reduce((sum,cur,i) => {
            if (cur === letter) {
                sum.push(i);
            }
            return sum;
        },[]);
    }
    /* showMatchedLetter(): reveals the letter(s) on the board that matches player's selection. */
    showMatchedLetter(key){
        $(`.${key}`).removeClass('hide').addClass('show');
    }
}