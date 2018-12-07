
/* Phrase.js to create a Phrase class to handle the creation of phrases */

/* Create the Phrase class in the Phrase.js file. */

/* The class should include a constructor that accepts a phrase as an argument. The class should include the
 following methods: (1) addPhraseToDisplay(): this adds letter placeholders to the display when the game starts.
  Each letter is presented by an empty box, one list item for each letter. See the example_phrase_html.txt file for an example of what the render HTML for a phrase should look like when the game starts. When the player correctly guesses a letter, the empty box is replaced with a the matched letter (see the showMatchedLetter() method below. Make sure the phrase displayed on the screen doesn't include spaces. (2) checkLetter(): checks to see if letter selected by player matches a letter in the phrase. (3) showMatchedLetter(): reveals the letter(s) on the board that matches player's selection.
 */

function isLetter(input) {
    // card number must be number
    var regex = /^[a-zA-Z]+$/;
    return regex.test(input);
}

class Phrase {
    constructor(myPhrase){
        this.phrase = myPhrase;
    }
    addPhraseToDisplay(){
        let reducedPhraseArray = this.phrase.split('').reduce((sum, cur) => {
            if(isLetter(cur)){
                sum.push('<li class=\"hide letter ' + cur.toLowerCase() + '\">'+ cur + '</li>');
            }
            if(cur.localeCompare(' ') === 0){
                sum.push('<li class=\"hide letter space\"></li>');
            }
            return sum;
        },[]);
        reducedPhraseArray.unshift('<div id=\"phrase\" class=\"section\">','<ul>');
        reducedPhraseArray.push('</ul>','</div>');
        $('div#phrase').replaceWith(reducedPhraseArray.join(''));
    }
    checkLetter(letter){
        return this.phrase.split('').reduce((sum,cur,i) => {
            if (cur === letter) {
                sum.push(i);
            }
            return sum;
        },[]);
    }
    showMatchedLetter(letter){
        $(`.${letter}`).removeClass('hide');
        $(`.${letter}`).addClass('show');
    }
}