$(document).ready(function()
{
	

	var gameOver = false;
	$button = $('button');
	var currentPlayer = 1;
	var ticTacToe =
	{
		board: 
		[
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		],
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
		},
		updateBoard: function($newMove)
		{
			var coordinates = $newMove.attr('data-location').split('-');
			if(currentPlayer === 1)
			{
				this.board[coordinates[0]][coordinates[1]] = 2;
			} else
			{
				this.board[coordinates[0]][coordinates[1]] = 5;
			}
		}
	};
	
	// Render a recent move or clear the board if game has been completed
	function renderBoard($newMove)
	{
		if(!gameOver){
			if(currentPlayer === 1)
			{
				$newMove.append('<img src="assets/x.png" />');
				currentPlayer = 2;
			} else
			{
				$newMove.append('<img src="assets/o.png" />');
				currentPlayer = 1;
			}
		} else
		{
			$('img').remove();
		}
	}
	
	// Check to see if a player has won or the game is a draw
	function gameEndCheck()
	{
		
		
	}
	
	
	// Event to start or reset a game
	$button.on(
		'click',
		function()
		{
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
						renderBoard($newMove);
						if(gameOver)
						{
							
						} else
						{
							$playerLabel.html("Player " + currentPlayer + "'s turn");
						}
					}
				});
		});
		
	
});