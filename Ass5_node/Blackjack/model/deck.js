const {Card} = require('./card.js');
class Deck
{
    static suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
    static values = ['A', 'K', 'Q', 'J','10', '9', '8', '7', '6','5', '4', '3', '2'];
    static deck = []
    constructor()
    {
        
        for(let i=0; i<Deck.suits.length; i++)
        {
            for(let j=0; j<Deck.values.length; j++)
            {
                let valueOfCard = Deck.values;
                let scoreOfCard = parseInt(valueOfCard[j]);
                if (valueOfCard[j] == 'J' || valueOfCard[j] == 'Q' || valueOfCard[j] == 'K')
                    scoreOfCard = 10;
                if (valueOfCard[j] == "A")
                    scoreOfCard = 1;
                let newCard = new Card(valueOfCard[j],Deck.suits[i],scoreOfCard);
                Deck.deck.push(newCard);
            }

        }
    }

    static getRandomCard() 
    {
        const randomCard = Math.floor(Math.random() * Deck.deck.length );
        const pickedCard = Deck.deck.splice(randomCard, 1)[0];
        return pickedCard;
    }

    displayDeck()
    {
        console.log(Deck.deck)
    }
}

module.exports = {Deck};