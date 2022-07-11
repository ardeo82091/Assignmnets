
class Game
{
    constructor(player1,player2)
    {
        this.player1 = new Player(player1, "X");
        this.player2 = new Player(player2, "X");
        this.board = new Board();
        this.turn =0;
    }

    play(cellNumberTobeMarked)
    {
        if (this.board.isInValidCell(cellNumberToBeMarked)) {
            return "cell between 0-8"
        }

        if (this.board.cells[cellNumberToBeMarked].isMarked()) {
            return "Choose another Cell"
        }
        if (this.turn % 2 == 0) {

            this.board.cells[cellNumberToBeMarked].markCell(this.player1)
            this.turn++
            if(this.board.resultAnalyse(this.player1)){
                return true,this.player1
            }
        }
        else{

            this.board.cells[cellNumberToBeMarked].markCell(this.player2)
            this.turn++
            if(this.board.resultAnalyse(this.player2)){
                return true,this.player2
            }

        }
        return false,-1
    }
}

module.exports={Game}