

function Game(){

	// initial setup
	this.board = new Array(9);
	for (i=0;i<9;i++){
		this.board[i] = 0;
	};
	this.turn = "X";
	this.move_number = 1;
	this.history = [];

	this.state = {	board: this.board,	
					turn:  this.turn,
					move_number: this.move_number,
					history: this.history };

	this.move = function(current_turn,position){
		this.move_number % 2 == 1 ? this.board[position] = 1 : this.board[position] = -1;
		this.move_number % 2 == 1 ? this.turn = "O" : this.turn = "X";
		this.move_number++;
		this.history.push([current_turn,position]);
		// console.log(this.state);
	};

	this.winner = function(){
		h1 = this.board[0]+this.board[1]+this.board[2];
		h2 = this.board[3]+this.board[4]+this.board[5];
		h3 = this.board[6]+this.board[7]+this.board[8];
		v1 = this.board[0]+this.board[3]+this.board[6];
		v2 = this.board[1]+this.board[4]+this.board[7];
		v3 = this.board[2]+this.board[5]+this.board[8];
		d1 = this.board[0]+this.board[4]+this.board[8];
		d2 = this.board[2]+this.board[4]+this.board[6];

		wins = [h1,h2,h3,v1,v2,v3,d1,d2];
		if (Math.max.apply(null,wins)==3){
			return 'X';
		}
		else if (Math.min.apply(null,wins)==-3){
			return 'O';
		}
		else {
			return null;
		}		
	};

};