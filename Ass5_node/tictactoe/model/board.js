const Cell = require("./cell.js")
class Board {
    constructor() {
        this.cells = []
        for (let index = 0; index < 9; index++) {
            this.cells.push(new Cell());
        }
    }
    isInValidCell(cellNo) {
        if(cellNo<0 || cellNo>8)
        return true;
        return false;
    }

    resultAnalyse(player) {
         return this.horizontal(player.symbol) || this.diagonal(player.symbol)|| this.vertical(player.symbol)
    
    }
    displayBoard(){
        for(let index=0;index<9;index++){
            if(index==0 || index==3 || index==6)
            console.log(this.cells[index].mark,"|",this.cells[index+1].mark,"|",this.cells[index+2].mark);
        }
        console.log()
    }

    horizontal(symbol) {
            
        if (this.cells[0].mark == this.cells[1].mark && this.cells[1].mark == this.cells[2].mark &&(this.cells[0].mark == "X" || this.cells[0].mark == "O")) {
            return true;
        }
        if (this.cells[3].mark == this.cells[4].mark && this.cells[4].mark == this.cells[5].mark &&(this.cells[3].mark == "X" || this.cells[3].mark == "O")) {
            return true;
        }
        if (this.cells[6].mark == this.cells[7].mark && this.cells[7].mark == this.cells[8].mark && (this.cells[6].mark == "X" || this.cells[6].mark == "O")) {
            return true;
        }
        return false;
    }
    diagonal(symbol) {
        if (this.cells[0].mark == this.cells[4].mark && this.cells[4].mark == this.cells[8].mark &&(this.cells[0].mark == 'X' || this.cells[0].mark == "O")) {
            return true;
        }
        if (this.cells[2].mark == this.cells[4].mark && this.cells[4].mark == this.cells[6].mark &&(this.cells[2].mark == 'X' || this.cells[2].mark == "O")) {
            return true;
        }
        return false;
     }
    vertical(symbol) { 
        if (this.cells[0].mark == this.cells[3].mark && this.cells[3].mark == this.cells[6].mark &&(this.cells[0].mark == 'X' || this.cells[0].mark == "O")) {
            return true;
        }
        if (this.cells[1].mark == this.cells[4].mark && this.cells[4].mark == this.cells[7].mark &&(this.cells[1].mark == 'X' || this.cells[1].mark == "O")) {
            return true;
        }
        if (this.cells[2].mark == this.cells[5].mark && this.cells[5].mark == this.cells[8].mark &&(this.cells[2].mark == 'X' || this.cells[2].mark == "O")) {
            return true;
        }
        
        return false;
    }
}

module.exports = {Board};