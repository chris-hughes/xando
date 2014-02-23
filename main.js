$(document).ready(function(){

	var g = new Game();
	// console.log(g.state);

	$('.gameSquare').on('click', function(){
		if ($(this).text()==""){
			if (g.turn=="X"){
				$(this).text('X');
				g.move(g.turn,$(this).index()/2);
			}
			else {
				$(this).text('O');
				g.move(g.turn,$(this).index()/2);
			}
			if (g.winner() != null){
				$('h1').text(g.winner()+'  Wins!');
			}
		}
	});

});