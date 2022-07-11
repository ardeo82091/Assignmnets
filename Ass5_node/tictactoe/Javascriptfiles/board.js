const cell = require("./cell.js")
class Board
{
    constructor()
    {
        this.cells = [];
        for(let i=0; i<9; i++)
        {
            this.cells.push(cell());
        }
    }

    isInvalidCell(cellNo)
    {
        return cellNo <0 || cellNo>8;
    }

    resultAnalyse(player)
    {
        return this.horizontal(player.symbol) || this.vertical(player.symbol) || this.digonal(player.symbol);
    }
}

horizontal(symbol)
{
    if(this.cells[0]==this.cells[1] && this.cells[1]==this.cells[2])
    {
        return true;
    }
    if(this.cells[3]==this.cells[4] && this.cells[4]==this.cells[5])
    {
        return true;
    }
    if(this.cells[6]==this.cells[7] && this.cells[7]==this.cells[8])
    {
        return true;
    }
    return false;
}

vertical()
{
    if(this.cells[0]==this.cells[3] && this.cells[3]==this.cells[6])
    {
        return true;
    }
    if(this.cells[1]==this.cells[4] && this.cells[4]==this.cells[7])
    {
        return true;
    }
    if(this.cells[2]==this.cells[5] && this.cells[5]==this.cells[8])
    {
        return true;
    }
    return false;
}

digonal()
{
    if(this.cells[0]==this.cells[4] && this.cells[4]==this.cells[8])
    {
        return true;
    }
    if(this.cells[2]==this.cells[4] && this.cells[4]==this.cells[6])
    {
        return true;
    }
    return false
}

module.export = {Board};