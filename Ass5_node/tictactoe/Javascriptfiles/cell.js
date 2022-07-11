const player = require('./player');
class Cell
{
    constructor()
    {
        this.mark = "";
    }

    isMark()
    {
        return this.mark != "";
    }

    markCell(player)
    {
        this.mark = player.symbol;
    }
}

module.export = {Cell};