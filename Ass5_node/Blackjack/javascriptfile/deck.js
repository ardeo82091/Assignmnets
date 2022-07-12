class Deck
{
    static suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
    static values = ['A', 'K', 'Q', 'J','10', '9', '8', '7', '6','5', '4', '3', '2'];
    constructor()
    {
        this.deck= [];
        for(let i=0; i<Deck.suits.length; i++)
        {
            for(let j=0; j<Deck.values.length; j++)
            {
                let valueOfCard = Deck.values;
                var score = parseInt(valueOfCard[j]);
                if (valueOfCard[j] == 'J' || valueOfCard[j] == 'Q' || valueOfCard[j] == 'K')
                    score = 10;
                if (valueOfCard[j] == "A")
                    score = 1;
                let card = { Value: valueOfCard[j], Suit: Deck.suits[i], Score : score };
                this.deck.push(card);
            }

        }
    }
        getRandomCard() {
        const randomCard = Math.floor(Math.random() * this.deck.length );
        const pickedCard = this.deck.splice(randomCard, 1)[0];
        return pickedCard;
      }
}

module.exports = {Deck};