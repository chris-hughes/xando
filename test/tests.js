describe("minimax", function(){

	/*
	for computer.
	+10 for EACH 2-in-a-line (with a empty cell) for computer.
	+1 for EACH 1-in-a-line (with two empty cells) for computer.
	*/

	describe('evaluation', function(){


		var player = 'X';


		it("scores +100 for 3 X in a row", function(){
			minimax_evaluate_row(
				[1,1,1],
				player).should.equal(100);
		})

		it("scores -100 for 3 O in a row", function(){
			minimax_evaluate_row(
				[-1,-1,-1],
				player).should.equal(-100);
		})

		it("scores +10 for 2 X in a row", function(){
			minimax_evaluate_row(
				[1,1,0],
				player).should.equal(10);
		})

		it("scores -10 for 2 O in a row", function(){
			minimax_evaluate_row(
				[-1,-1,0],
				player).should.equal(-10);
		})

		it("scores 0 for 2 X in a row with an O", function(){
			minimax_evaluate_row(
				[1,1,-1],
				player).should.equal(0);
		})


		it("scores +1 for 1 X in a row", function(){
			minimax_evaluate_row(
				[1,0,0],
				player).should.equal(1);
		})

		it("scores -1 for 1 O in a row", function(){
			minimax_evaluate_row(
				[-1,0,0],
				player).should.equal(-1);
		})


		it('scores full board for X', function(){
			minimax_evaluate(
				[1,1,1,
				 0,0,0,
				 1,0,0],
				player).should.equal(124);
		})

		it('scores full board for X and Os', function(){
			minimax_evaluate(
				[1,1, 0,
				 0,0,-1,
				 1,0,-1],
				player).should.equal(11);
		})

	})

	describe('search', function(){
		var board = [
			1,0,0,
			0,1,0,
			0,0,0,
		]

		it('chooses the bottom right for depth 1 and X', function(){
			minimax([
				1,0,0,
				0,1,0,
				0,0,0,
			], 'X', 1)
			.should.eql([
				1,0,0,
				0,1,0,
				0,0,1,
			])
		})

		it('chooses the bottom right for depth 1 and O', function(){
			minimax([
				1,0,0,
				0,1,0,
				0,0,0,
			], 'O', 1)
			.should.eql([
				1,0,0,
				0,1,0,
				0,0,-1,
			])
		})

	})

})