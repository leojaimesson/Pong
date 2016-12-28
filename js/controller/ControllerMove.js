
function ControllerMove()
{
	var self = this;

	this.keys = {};

	document.addEventListener("keydown", function(event)
	{
		self.keys[event.keyCode] = true;
	});

	document.addEventListener("keyup", function(event)
	{
		delete self.keys[event.keyCode];
	});

};

ControllerMove.prototype = {
	movesPlayer: function(player)
	{
		var $canvas = document.querySelector("#mycanvas");
		if(player.keyUp in this.keys && player.y > 0)
			player.y -= player.speed;
		if(player.keyDown in this.keys && player.y + player.height < $canvas.height)
			player.y += player.speed;
	},


	movesBall: function(ball, player1, player2)
	{
		var $canvas = document.querySelector("#mycanvas");

		if(ball.y + ball.height >= player1.y && ball.y <= player1.y + player1.height && ball.x <= player1.x + player1.width) 
		{
			ball.dirx = 1;
			ball.mod += 0.5;
		}

		else if(ball.y + ball.height >= player2.y && ball.y <= player2.y + player2.height && ball.x + ball.width >= player2.x) 
		{
			ball.dirx = -1;
			ball.mod += 0.5;
		}

		if(ball.y <= 0)
		{
			ball.diry = 1;
		}

		else if(ball.y + ball.height >= $canvas.height)
		{
			ball.diry = -1;
		}
			

		 ball.x += (ball.speed + ball.mod) * ball.dirx;
		 ball.y += (ball.speed + ball.mod) * ball.diry;

	}
};