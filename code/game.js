/*
    * Filename - game.js 
    * Author - Tristan Gant
    * Purpose - creates an array of circle objects to handle game functionality
    * Last Edited - 10/21/20
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
        const winningCombo = [
            [35,36,37,38], [36,37,38,39], [37,38,39,40], [38,39,40,41],
            [28,29,30,31], [29,30,31,32], [30,31,32,33], [31,32,33,34],
            [21,22,23,24], [22,23,24,25], [23,24,25,26], [24,25,26,27],
            [14,15,16,17], [15,16,17,18], [16,17,18,19], [17,18,19,20],
            [7,8,9,10], [8,9,10,11], [9,10,11,12], [10,11,12,13], 
            [0,1,2,3], [1,2,3,4], [2,3,4,5], [3,4,5,6], //24
            //all the horizonal combos, now onto verticle
            [35,28,21,14], [28,21,14,7], [21,14,7,0],
            [36,29,22,15], [29,22,15,8], [22,15,8,1],
            [37,30,23,16], [30,23,16,9], [23,16,9,2],
            [38,31,24,17], [31,24,17,10], [24,17,10,3],
            [39,32,25,18], [32,25,18,11], [25,18,11,4],
            [40,33,26,19], [33,26,19,12], [26,19,12,5],
            [41,34,27,20], [34,27,20,13], [27,20,13,6], //21 + 24 =45
            //diagonal forward 
            [35,29,23,17], [28,22,16,10], [21,15,9,3],
            [36,30,24,18], [29,23,17,11], [22,16,10,4],
            [37,31,25,19], [30,24,18,12], [23,17,11,5],
            [38,32,26,20], [31,25,19,13], [24,18,12,6], //12 + 45 = 57
            //diagonal backwards 
            [41,33,25,17], [34,26,18,10], [27,19,11,3],
            [40,32,24,16], [33,25,17,9], [26,18,10,2],
            [39,31,23,15], [32,24,16,8], [25,17,9,1],
            [38,30,22,14], [31,23,15,7], [24,16,8,0] //12 + 57 = 69


        ];

        winningCombo.forEach((win) => 
        {
            const [a, b, c, d] = win; 
            const circleA = this.circles[a];
            const circleB = this.circles[b];
            const circleC = this.circles[c];
            const circleD = this.circles[d]; 

            if(circleA.value && circleA.value === circleB.value && circleA.value === circleC.value && circleA.value === circleD.value)
            {
                this.inProgress = false; 
                this.winner = circleA.value; //red or yellow
            }

            if(this.movesMade === this.circles.length) this.inProgress = false;
       });
    }
}



Game.red = 'red';
Game.yellow = 'yellow';


// [0,  1,  2,  3,  4,  5,  6]
// [7,  8,  9,  10, 11, 12, 13]
// [14, 15, 16, 17, 18, 19, 20]
// [21, 22, 23, 24, 25, 26, 27]
// [28, 29, 30, 31, 32, 33, 34]
// [35, 36, 37, 38, 39, 40, 41]


// v-bind:style="{color:circle.value}"      
// v-bind:class="{highlighted:circle.highlighted}"