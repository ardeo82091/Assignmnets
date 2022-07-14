const {Game} = require('./model/game.js');

const newGame = new Game("Ankit Raj", "Abhishek");
const ankit = new Game("Ankit Raj", "Abhishek Sharma"); 
ankit.addCard()
ankit.addCard()
ankit.addCard()
ankit.addCard()
ankit.addCard()
ankit.addCard()
ankit.addCard()
ankit.addCard()
console.log(ankit.player1)
console.log(ankit.player2)