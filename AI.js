// function AI(board,player,depth)

var g = new Game();
	// minimax player
minimax = function(board,player,depth){
	this.board = board;
	this.player = player;
	this.depth = depth;

  	// Generate possible next moves
  	this.nextMoves = g.empty(this.board);

	var bestScore;
	if (this.player=="Computer"){
		bestScore=-99999;
	}
	else {
		bestScore=99999;
	}

	var currentScore;
	var bestMove;

	if (this.nextMoves.length==0 || g.winner(this.board)==true || this.depth == 0) {
     	// Gameover or depth reached, evaluate score
     	bestScore = heuristicScore(this.board);
     	return bestScore;
  	}
  	else {
        for (i=0;i<this.nextMoves.length;i++) {
        	console.log('aa: '+this.board);
            // Try this move for the current "player"
            if (this.player=="Computer"){
            	this.board[nextMoves[i]]=-1;
            }
            else {
            	this.board[nextMoves[i]]=1;
            }

            console.log("loop i: "+i);
            console.log(this.board);
            if (this.player == "Computer") {  // computer is maximizing player
				currentScore = minimax(this.board,"Human",depth - 1)[0];
				if (currentScore > bestScore) {
					console.log('bestScore '+bestScore);
					bestScore = currentScore;
					console.log(this.nextMoves);
					bestMove = i;
					console.log('bestMove '+bestMove);
				}
            }
            else {  // human is minimizing player
               	currentScore = minimax(this.board,"Computer",depth - 1)[0];
               	if (currentScore < bestScore) {
                	bestScore = currentScore;
                  	bestMove = i;
               	}
            }
            // Undo move
            this.board[i+1]=0;
        }
    }
    this.nextMoves = g.empty(this.board);
    move = nextMoves[bestMove];
	return [bestScore, move];

};

// The heuristic evaluation function for the current board
// +100, +10, +1 for EACH 3-, 2-, 1-in-a-line for computer.
// -100, -10, -1 for EACH 3-, 2-, 1-in-a-line for human.
// 0 otherwise
function heuristicScore(board){
	this.board = board;

	h1 = heuristicLine(this.board,0,1,2);
	h2 = heuristicLine(this.board,3,4,5);
	h3 = heuristicLine(this.board,6,7,8);
	v1 = heuristicLine(this.board,0,3,6);
	v2 = heuristicLine(this.board,1,4,7);
	v3 = heuristicLine(this.board,2,5,8);
	d1 = heuristicLine(this.board,0,4,8);
	d2 = heuristicLine(this.board,2,4,6);

	return h1+h2+h3+v1+v2+v3+d1+d2;
};

function heuristicLine (board,cellA,cellB,cellC){
	score = 0;
	this.board = board;
	// first cell
	if (this.board[cellA]==-1){
		score = 1
	}
	else if (this.board[cellA]==1){
		score = -1;
	}

	// second cell
	if (this.board[cellB]==-1){
		if (score==1){
			score = 10; // two in a row
		}
		else if (score==-1){
			return 0; // one of each
		}
		else {
			score = 1; // first cell was empty
		}
	}
	else if (this.board[cellB]==1){
		if (score==1){
			return 0; // one of each
		}
		else if (score==-1){
			score = -10; // two in a row
		}
		else {
			score = -1; // first cell was empty
		}
	}

	// third cell
	if (this.board[cellC]==-1){
		if (score>0){ 
			score *= 10; // two or three in row
		}
		else if (score<0){
			return 0; // at least one of each
		}
		else {
			score = 1; //first and second cell empty
		}
	}
	else if (this.board[cellC]==1){
		if (score>0){
			return 0; // at least one of each
		}
		else if (score<0){
			score *= 10 // two or three in a row
		}
		else {
			score = -1; // first and second cell empty
		}
	}

	return score;
};
