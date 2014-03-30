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

	describe('collapse', function(){
		it('works on level 1', function(){
			collapse_tree([23,45,12],true, true).should.eql(45)
		})
		it('works on level 2', function(){
			collapse_tree([[1,2,3],[4,5,6]],true, true).should.eql(4)
		})
		it('works on level 3', function(){
			collapse_tree([[[1,2],[3,4]],[[5,6],[7,8]]],true,true).should.eql(6)
		})

		it('returns index', function(){
			collapse_tree([[[1,2],[3,4]],[[5,6],[7,8]]],true).should.eql(1)
		})
	})

	describe('search', function(){



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

		it('chooses the bottom right for depth 1 and X', function(){

			minimax([
				1,0,0,
				0,1,0,
				0,0,0,
			], 'X', 2)
			.should.eql([
				1,0,0,
				0,1,0,
				0,0,1,
			])


			// minimax([
			// 	0,0,0,
			// 	0,0,-1,
			// 	1,0,0,
			// ], 'X', 2)
			// .should.eql([
			// 	1,0,0,
			// 	0,0,-1,
			// 	1,0,0,
			// ])
		})

	})

})