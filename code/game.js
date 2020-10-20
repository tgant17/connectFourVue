/*
    * Filename - game.js 
    * Author - Tristan Gant
    * Purpose - creates an array of circle objects to handle game functionality
    * Last Edited - 10/19/20
    * Placing indexs on the board works and player state changes work
    * moving forward the only thing that needs to be done is the win conditions need to be defined 
*/



class Game
{
    constructor()
    {
        this.inProgress = true; 
        this.winner = null; 
        this.current = Game.red; //initial starter
        this.movesMade = 0; 
        this.circles = new Array(42).fill().map(c => new Circle); //6x7 grid creates 42 circle objects 
    }

    makeMove(i)
    {
        //if game is in progress and the circle does not have a value
        if(this.inProgress && !this.circles[i].value)
        {
            this.checkValidMove(i); 
        }
    }

    checkValidMove(i)
    {
        let beginMoves = [35,36,37,38,39,40,41]; 

        if(beginMoves.includes(i) && !this.circles[i].value)
        {
            this.circles[i].value = this.current;
            this.movesMade++; 
            this.checkForWinner(i); 

            // if the current turn is red then the next turn will be yellow
            // otherwise the next turn will be red

            if(this.current === Game.red) this.current = Game.yellow; 
            else this.current = Game.red;
            // this.current = (this.current === Game.red) ? Game.red : Game.yellow;
        }

        //if there is nothing at this circle but there is something below it
        else if(!this.circles[i].value && this.circles[i+7].value)
        {
            this.circles[i].value = this.current; 
            this.movesMade++;
            this.checkForWinner(i); 

            if(this.current === Game.red) this.current = Game.yellow; 
            else this.current = Game.red;
            // this.current = (this.current === Game.red) ? Game.red : Game.yellow;

        }
    }

    checkForWinner(i)
    {
        let startingPosition = this.circles[i].value; 
        // let startingPositionNum = i; 
        let count = 0; 

        //check for horizontal win 
        for(let j = i; j < 4; j++)
        {
            if(startingPosition == this.circles[j].value) count++; 
            if(startingPosition == this.circles[i-j].value) count++; 
        }
        if(count == 4)
        {
            this.inProgress = false; 
            this.winner = startingPosition;
        }
    }
}



Game.red = 'R';
Game.yellow = 'Y';


// [0, 1, 2, 3, 4, 5, 6]
// [7, 8, 9, 10, 11, 12, 13]
// [14, 15, 16, 17, 18, 19, 20]
// [21, 22, 23, 24, 25, 26, 27]
// [28, 29, 30, 31, 32, 33, 34]
// [35, 36, 37, 38, 39, 40, 41]