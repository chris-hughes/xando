

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


	this.hotbread = function(board){
		var target = minimax(board, -1, 2);
		for (var i = 0; i < board.length; i++) {
			if(target[i] !== board[i]){
				return i;
			}
		}
	};

};