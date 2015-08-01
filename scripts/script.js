$(document).ready(function()
{
	var gameOver = false;
	var currentPlayer = 1;
	var game =
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
		}
	};
	
	function renderBoard(newMove, currentPlayer)
	{
		if(!gameOver){
			if(currentPlayer === 1)
			{

			} else
			{

			}
		} else
		{
			$('img').remove();
		}
	}
	
	
	
});