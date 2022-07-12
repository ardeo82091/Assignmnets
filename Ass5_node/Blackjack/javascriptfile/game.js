const {Player} = require('./player');
const {Deck} = require('./deck.js');

class Game
{
    constructor(nameOfPlayer1,nameOfPlayer2)
    {
        this.player1 = new Player(nameOfPlayer1,0);
        this.player2 = new Player(nameOfPlayer2,0);
    }

    addCard()
    {
        this.player1.value+= Deck.getRandomCard();
        this.player2.value+= Deck.getRandomCard();
        this.checkBlackjack();
    }

    skipCard()
    {
        this.player2.value+= Deck.getRandomCard();
        this.checkBlackjack();
    }

    checkBlackjack() {
        if (this.player1.value == 21) 
        {
          console.log("Player1 win");
        }
        else if (this.player2.value === 21) {
          console.log("Player2 wins");
        } 
        else if (this.player1.value === 21 && this.player2.value === 21) {
          console.log("Its a draw");
        } 
        else if (this.player1.value > 21) {
            console.log("Player2 wins. Game over");
        }
        else if (this.player2.value> 21) {
              console.log("Player1 wins. Game over");
        }
    }


}
module.exports = {Game};

