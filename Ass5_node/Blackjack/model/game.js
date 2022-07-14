const {Player} = require('./player');
const {Deck} = require('./deck.js');

class Game
{
    static deck = new Deck();
    
    constructor(nameOfPlayer1,nameOfPlayer2) 
    { 
        this.player1 = new Player(nameOfPlayer1,0,[]); 
        this.player2 = new Player(nameOfPlayer2,0,[]); 
        this.deck = new Deck(); 
        this.turn = 0; 
        this.skipcountPlayer1=0;
        this.skipcountPlayer2=0;
    } 
 
    addCard() 
    { 
        if(this.turn%2==0) 
        { 
            let randomCard = Deck.getRandomCard()
            this.player1.array.push(`${randomCard.valueOfCard}, ${randomCard.suit}`)
            this.player1.value+= randomCard.scoreOfCard; 
        } 
         
        if(this.turn%2==1) 
        { 
            let randomCard = Deck.getRandomCard()
            this.player2.array.push(`${randomCard.valueOfCard}, ${randomCard.suit}`)
            this.player2.value+= randomCard.scoreOfCard; 
            this.checkBlackjack(); 
        } 
        this.turn++; 
    } 


    skipCard() 
    { 

        if(this.turn%2==0)
        {
            this.player1.value+=0; 
            this.skipcountPlayer1++;
        }
        if(this.turn%2==1)
        {
            this.player1.value+=0;
            this.skipcountPlayer2++;
            this.checkBlackjack();
        }
        
    }

    checkBlackjack() {
        if (this.player1.value > 21 && this.player2.value <= 21) 
        {
          console.log("Player2 win");
        }
        else if (this.player1.value <= 21 && this.player2.value > 21) {
          console.log("Player1 wins");
        } 
        else if (this.player1.value > 21 && this.player2.value > 21) {
            if(this.player1.value>this.player2.value) console.log("Player1 win");
            if(this.player1.value<this.player2.value) console.log("Player2 win");
        }
        else if(this.skipcountPlayer1>0 && this.skipcountPlayer2>0)
        console.log("Match is drawn")
    }
 
} 

module.exports = {Game};

