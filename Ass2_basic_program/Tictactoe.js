var board = new Array(9).fill(null);
const player1 =1;
const player2 =2;
var cell, result=0, won=0, used=0;
function checkwin()
{
    if(board[0]==board[1] && board[1]==board[2])
    {
        if(board[0]=='X') return 1;
        else if(board[0]=='O') return 2;
    }
    if(board[3]==board[4] && board[4]==board[5])
    {
        if(board[3]=='X') return 1;
        else if(board[3]=='O') return 2;
    }
    if(board[6]==board[7] && board[7]==board[8])
    {
        if(board[6]=='X') return 1;
        else if(board[6]=='O') return 2;
    }
    if(board[0]==board[3] && board[3]==board[6])
    {
        if(board[0]=='X') return 1;
        else if(board[0]=='O') return 2;
    }
    if(board[1]==board[4] && board[4]==board[7])
    {
        if(board[1]=='X') return 1;
        else if(board[1]=='O') return 2;
    }
    if(board[2]==board[5] && board[5]==board[8])
    {
        if(board[2]=='X') return 1;
        else if(board[2]=='O') return 2;
    }
    if(board[0]==board[4] && board[4]==board[8])
    {
        if(board[0]=='X') return 1;
        else if(board[0]=='O') return 2;
    }
    if(board[2]==board[4] && board[4]==board[6])
    {
        if(board[2]=='X') return 1;
        else if(board[2]=='O') return 2;
    }
}

function mark(player,cell)
{
    if(player==1 && board[cell]==null) board[cell]='X';
    else if(player==2 && board[cell]==null) board[cell]='O';
    else
    {
        if(player==1 && board[cell]!=null) 
        {
            if(board[cell]=='X') console.log("Sorry, This cell is already used by you");
            else console.log("Sorry, This cell is already used by Player2");
            used=1;
        }
        if(player==2 && board[cell]!=null)
        {
            if(board[cell]=='O') console.log("Sorry, This cell is already used by you");
            else console.log("Sorry, This cell is already used by Player1");
            used=1;
        }
    }
}

function display()
{
    //for(let i=0; i<9; i++)
    //{
    //    console.log(board[i]);
    //    console.log();
    //}
    console.log(board);
}

for(let i=0; i<5; i++)
{
    var cell = prompt("Plyer1 Plz Enter the cell ");
    mark(player1,cell);
    if(used ==1) {
        var cell = prompt("Plyer1 Plz Enter the cell ");
        mark(player1,cell);
        used=0;
    }
    display();
    result = checkwin();
    if(result==1)
    {
        console.log("Player1 won the game");
        won=1;
        break;
    }
    else if(result==2)
    {
        console.log("Player2 won the game");
        won=1;
        break;
    }

    var cell = prompt("Plyer2 Plz Enter the cell ");
    mark(player2,cell);
    if(used ==1) {
        var cell = prompt("Plyer2 Plz Enter the cell ");
        mark(player2,cell);
        used=0;
    }
    display();
    result = checkwin();
    if(result==1)
    {
        console.log("Player1 won the game");
        won=1;
        break;
    }
    else if(result==2)
    {
        console.log("Player2 won the game");
        won=1;
        break;
    }
}
if(won==0) console.log("The game is draw");



