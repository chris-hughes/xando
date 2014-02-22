$(document).ready(function(){

	var g = new Game();

	$('.gameSquare').on('click', function(){
		if ($(this).text()==""){
			if (g.turn=="X"){
				$(this).text('X');
				g.turn='O';
			}
			else {
				$(this).text('O');
				g.turn='X';
			}

		}
		// console.log($(this).index());
	});

});