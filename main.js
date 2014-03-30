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


	$('#start').on('click',function(){
		// console.log(opponent);
		// console.log(first);

		// restart the game
		for (i=0;i<9;i++){
			board[i] = 0;
		};
		turn = "X";
		move_number = 1;
		history = [];
		$('h1').text('Play!');
		$('.gameSquare').text('');


		// if computer plays first
		if (opponent!='Human' && first=="Computer"){
			if (opponent="Random"){
				cell = g.random(board)
			}
			else {
				cell = g.minimax(board,"Computer",2);
			}
			cellSquare = $('.gameSquare')[cell];
			$(cellSquare).text('O');
			board[cell] = -1;
			move_number++;
			history.push(["O",cell]);
			turn="X";
		}

		// main game logic
		$('.gameSquare').on('click',function(){

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

					if (opponent!="Human"){
						if (opponent=="Random"){
							cell = g.random(board)
							console.log(board);
						}
						else {
							console.log('global board pre: '+board);
							cell = minimax(board,"Computer",2)[0];
							console.log(cell);
							console.log('global board post: '+board);
						}	
							
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
					console.log('global board: '+board);
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

		});

	});

});