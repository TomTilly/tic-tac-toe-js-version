$(document).ready(function()
{
	
	$button = $('button');
	
	var ticTacToe =
	{
		
		board: 
		[
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		],
		
		gameOver: false,
		currentPlayersTurn: 1,
		isTie: false,
		mostRecentSpace: '',
		winningPlayer: '',
		
		
		gamesPlayed: '',
		player1Wins: '',
		player1Losses: '',
		player2Wins: '',
		player2Losses: '',
		
		
		resetBoard: function()
		{
			for(var i = 0; i < this.board.length; i++)
			{
				for(var j = 0; j < this.board[i].length; j++)
				{
					this.board[i][j] = 0;
				}
			}
			this.gameOver = false;
			this.currentPlayersTurn = 1;
			this.isTie = false;
			this.mostRecentSpace = '';
		},
		
		
		updateBoard: function($newMove)
		{
			var coordinates = $newMove.attr('data-location').split('-');
			if(this.currentPlayersTurn === 1)
			{
				this.board[coordinates[0]][coordinates[1]] = 2;
				this.mostRecentSpace = coordinates;
			} else
			{
				this.board[coordinates[0]][coordinates[1]] = 5;
				this.mostRecentSpace = coordinates;
			}
		},
		
		
		horizontalCheck: function(rowNumber)
		{
			var total = 0;
			for(var i = 0; i < 3; i++)
			{
				total += this.board[rowNumber][i];
			}
			return total;
		},
		
		
		verticalCheck: function(columnNumber)
		{
			var total = 0;
			for(var i = 0; i < 3; i++)
			{
				total += this.board[i][columnNumber];
			}
			return total;
		},
		
		
		diagonalCheck: function(rowNumber, columnNumber)
		{
			var total = 0,
				i,
				j;
			
			function didPlayerWin(total)
			{
				if (total === 6)
				{
					return [true, 1];
				} else if (total === 15)
				{
					return [true, 2];
				}
				return [false, null];
			}
			
			if( (columnNumber == 0 || columnNumber == 2) && (rowNumber == 0 || rowNumber == 2))
			{
				if(columnNumber == 0)
				{
					if (rowNumber == 0) // New move was 0-0
					{
						for(i = 0; i < 3; i++)
						{
							total += this.board[i][i];
						}
						results = didPlayerWin(total);
						return results;
					} else 				// New move was 2-0
					{
						for(i = 2, j = 0; i >= 0; i--, j++)
						{
							total += this.board[i][j];
						}
						results = didPlayerWin(total);
						return results;
					}
				} else 
				{
					if (rowNumber == 0)	// New move was 0-2
					{
						for(i = 0, j = 2; i < 3; i++, j--)
						{
							total += this.board[i][j];
						}
						results = didPlayerWin(total);
						return results;
					} else					// New move was 2-2
					{
						for(i = 2; i >= 0; i--)
						{
							total += this.board[i][i];
						}
						results = didPlayerWin(total);
						return results;
					}
				}
			} else if (rowNumber == 1 && columnNumber == 1) // New move was 1-1 (center of grid)
			{
				
				for(i = 0; i < 3; i++)
				{
					total += this.board[i][i];
				}
				
				results = didPlayerWin(total);
				if (results[0] === true){
					return results;
				}
				
				total = 0;
				
				for(i = 2; i >= 0; i--)
				{
					total += this.board[i][i];
				}
				
				results = didPlayerWin(total);
				if (results[0] === true)
				{
					return results;
				}
			}
			
			return [false, null];
		},
		
		
		isBoardFull: function()
		{
			for(var i = 0; i < 3; i++)
			{
				for(var j = 0; j < 3; j++)
				{
					if (this.board[i][j] === 0)
					{
						return false;
					}
				}
			}
			return true;
		},
		
		
		isGameOver: function()
		{
			
			var total,
				results;
			
			
			total = this.horizontalCheck(this.mostRecentSpace[0]);
			if (total === 6)
			{
				this.gameOver = true;
				this.winningPlayer = 1;
				return;
			} else if (total === 15)
			{
				this.gameOver = true;
				this.winningPlayer = 2;
				return;
			}
			
			
			total = this.verticalCheck(this.mostRecentSpace[1]);
			if (total === 6)
			{
				this.gameOver = true;
				this.winningPlayer = 1;
				return;
			} else if (total === 15)
			{
				this.gameOver = true;
				this.winningPlayer = 2;
				return;
			}
			
			
			results = this.diagonalCheck(this.mostRecentSpace[0], this.mostRecentSpace[1]);
			if (results[0] === true)
			{
				this.gameOver = results[0];
				this.winningPlayer = results[1];
				return;
			}
			
			
			if (this.isBoardFull())
			{
				this.gameOver = true;
				this.isTie = true;
				return;
			}
		}
	};
	
	// Render a recent move or clear the board if game has been completed
	function renderBoard($newMove)
	{
		if(!ticTacToe.gameOver){
			if(ticTacToe.currentPlayersTurn === 1)
			{
				$newMove.append('<img src="assets/x.png" />');
				ticTacToe.currentPlayersTurn = 2;
			} else
			{
				$newMove.append('<img src="assets/o.png" />');
				ticTacToe.currentPlayersTurn = 1;
			}
		} else
		{
			$('#gameboard-wrapper').off('click', 'div[data-location]');
			if(ticTacToe.currentPlayersTurn === 1)
			{
				$newMove.append('<img src="assets/x.png" />');
			} else
			{
				$newMove.append('<img src="assets/o.png" />');
			}
		}
	}
	
	
	// Event to start or reset a game
	$button.on(
		'click',
		function()
		{
			ticTacToe.resetBoard();
			$('img').remove();
			$(this).hide();
			$playerLabel = $('p');
			$playerLabel.html("Player 1's turn");
			$('#gameboard-wrapper').on(
				'click',
				'div[data-location]',
				function() 
				{
					var $newMove = $(this);
					if (!($newMove.is(':parent(img)'))) // If space hasn't already been clicked
					{
						ticTacToe.updateBoard($newMove);
						ticTacToe.isGameOver();
						renderBoard($newMove);
						if(ticTacToe.gameOver)
						{
							$button.show();
							$button.html("Play again?");
							if(ticTacToe.isTie)
							{
								$playerLabel.html("Draw!");
							} else
							{
								$playerLabel.html("Player " + ticTacToe.winningPlayer + " wins!");
							}
						} else
						{
							$playerLabel.html("Player " + ticTacToe.currentPlayersTurn + "'s turn");
						}
					}
				});
		});
		
	
});