

function Game(){

	// check if a cell is empty
	this.is_empty = function(board,cell){
		return board[cell]==0 ? true : false;
	};

	// return all empty cells
	this.empty = function(board){
		var cells = [];
		for (i=0;i<9;i++){
			if (board[i]==0){
				cells.push(i);
			}
		}
		return cells;
	};

	// has the game been won
	this.winner = function(board){
		h1 = board[0]+board[1]+board[2];
		h2 = board[3]+board[4]+board[5];
		h3 = board[6]+board[7]+board[8];
		v1 = board[0]+board[3]+board[6];
		v2 = board[1]+board[4]+board[7];
		v3 = board[2]+board[5]+board[8];
		d1 = board[0]+board[4]+board[8];
		d2 = board[2]+board[4]+board[6];

		wins = [h1,h2,h3,v1,v2,v3,d1,d2];
		if (Math.max.apply(null,wins)==3 || Math.min.apply(null,wins)==-3){
			return true;
		}
		else {
			return false;
		}		
	};

	// is the board full
	this.full = function(board){
		empty = this.empty(board);
		if (empty.length==0 ){
			return true;
		}
		else {
			return false;
		}
	};

	// random player
	this.random = function(board){
		empty = this.empty(board);
		rand = Math.floor(Math.random()*empty.length);
		return empty[rand];
	};

	// minimax player
	this.minimax = function(board,player,depth){
		if (this.winner(board)==true || depth==0){
			return this.heuristicScore(board);
		}
	};

   	// The heuristic evaluation function for the current board
   	// +100, +10, +1 for EACH 3-, 2-, 1-in-a-line for computer.
    // -100, -10, -1 for EACH 3-, 2-, 1-in-a-line for human.
   	// 0 otherwise
	this.heuristicScore = function(board){

		h1 = this.heuristicLine(board,0,1,2);
		h2 = this.heuristicLine(board,3,4,5);
		h3 = this.heuristicLine(board,6,7,8);
		v1 = this.heuristicLine(board,0,3,6);
		v2 = this.heuristicLine(board,1,4,7);
		v3 = this.heuristicLine(board,2,5,8);
		d1 = this.heuristicLine(board,0,4,8);
		d2 = this.heuristicLine(board,2,4,6);
		console.log('h1: '+h1);
		console.log('h2: '+h2);
		console.log('h3: '+h3);
		console.log('v1: '+v1);
		console.log('v2: '+v2);
		console.log('v3: '+v3);
		console.log('d1: '+d1);
		console.log('d2: '+d2);
		console.log(h1+h2+h3+v1+v2+v3+d1+d2);
		return h1+h2+h3+v1+v2+v3+d1+d2;
	};

	this.heuristicLine = function(board,cellA,cellB,cellC){
		score = 0;
		// first cell
		if (board[cellA]==-1){
			score = 1
		}
		else if (board[cellA]==1){
			score = -1;
		}

		// second cell
		if (board[cellB]==-1){
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
		else if (board[cellB]==1){
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
		if (board[cellC]==-1){
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
		else if (board[cellC]==1){
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

};