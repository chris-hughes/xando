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

	// read inputs
	var e = document.getElementById("opponent");
	var opponent = e.options[e.selectedIndex].value;

	$('#opponent').change(function(){
		e = document.getElementById("opponent");
		opponent = e.options[e.selectedIndex].value;
		if (opponent=='Random' || opponent=='Bread'){
			if (!$('#firstMove option')[1]){
				$('#firstMove').append('<option value="Computer">Computer</option>');
			}
		}
		else {
			$('#firstMove option')[1].remove();
			$('#firstMove').change();
		}
	});

	var f = document.getElementById("firstMove");
	var first = f.options[f.selectedIndex].value;

	$('#firstMove').change(function(){
		f = document.getElementById("firstMove");
		first = f.options[f.selectedIndex].value;
	});

	// restart the game
	$('#restart').on('click',function(){
		for (i=0;i<9;i++){
			board[i] = 0;
		};
		turn = "X";
		move_number = 1;
		history = [];
		$('h1').text('Tic-Tac-Toe');
		$('.gameSquare').text('');
		$('.gameSquare').on('click', play)
	});

	$('.gameSquare').on('click', play);

	function play(){
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

				if (opponent=="Random"){
					cell = g.random(board)
					cellSquare = $('.gameSquare')[cell];
					$(cellSquare).text('O');
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
			if (g.full(board)==true){
				$('h1').text("It's a draw!");
			}
		}

	};

});