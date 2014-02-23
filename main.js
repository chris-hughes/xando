$(document).ready(function(){

	var g = new Game();

	// initial setup
	board = new Array(9);
	for (i=0;i<9;i++){
		board[i] = 0;
	};
	turn = "X";
	move_number = 1;
	history = [];

	state = {	board: board,	
				turn:  turn,
				move_number: move_number,
				history: history };


	$('.gameSquare').on('click', function(){
		var cell = $(this).index()/2;

		if (g.is_empty(board,cell)){
			if (turn=="X"){
				$(this).text('X');
				board[cell] = 1;
				move_number++;
				history.push(["X",cell]);
				if (g.winner(board) == true){
					$('h1').text(turn+'  Wins!');
					$('.gameSquare').attr('onclick','').unbind('click');
					return;
				}
				turn = "O"
			}
			else {
				$(this).text('O');
				board[cell] = -1;
				move_number++;
				history.push(["O",cell]);
				if (g.winner(board) == true){
					$('h1').text(turn+'  Wins!');
					$('.gameSquare').attr('onclick','').unbind('click');
					return;
				}
				turn = "X"
			}
		}
	});

});