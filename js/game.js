const KEYW = 87;
const KEYS = 83;
const KEYUP = 38;
const KEYDOWN = 40;

//seleciona o canvas alvo
var $canvas = document.querySelector('#mycanvas');

//define que todo elemento que for desenhado será 2d
var context = $canvas.getContext("2d");


var player1 = new Player(1, $canvas.height / 2 - 60, 120, 15, 0, 17, KEYW, KEYS);
var player2 = new Player(884, $canvas.height / 2 - 60, 120, 15, 0, 17, KEYUP, KEYDOWN);
var ball = new Ball($canvas.width / 2 - 15, $canvas.height / 2 - 15, 30, 30, -1, 1, 2, 1);

var controllerMove = new ControllerMove();


function newGame()
{
	ball.y = $canvas.height / 2 - ball.height / 2;
	ball.x = $canvas.width / 2 - ball.width / 2;
	ball.mod = 2;
}

function winner()
{
	if(ball.x < player1.x + player1.width - 15)
	{
		player2.score++;
		newGame();
	}

	else if(ball.x + ball.width > player2.x + 15)
	{
		player1.score++;
		newGame();
	}

}

function draws() 
{

	//limpa a tela
	context.clearRect(0, 0, $canvas.width, $canvas.height);

	
	//define a cor dos objetos desenhados no canvas
	context.fillStyle = "#ffffff";	
	//define a cor do contorno dos objetos desenhados no canvas
	context.strokeStyle = "#ffffff";
	
	//cria um retangulo no canvas
	context.fillRect(player1.x, player1.y, player1.width, player1.height);
	context.fillRect(player2.x, player2.y, player2.width, player2.height);
	context.fillRect(ball.x, ball.y, ball.width, ball.height);

	var y = 0
	for(var i = 0; i < 75; i++)
	{
		context.strokeRect($canvas.width / 2 - 2, y+i, 4, 8);
		y += 8;				
	}

	controllerMove.movesPlayer(player1);
	controllerMove.movesPlayer(player2);
	controllerMove.movesBall(ball, player1, player2);
	winner();

	//define a font usada no canvas
	context.font = "80px Arial";

	//escre um texto no canvas
	context.fillText(player1.score, 200, 80);
	context.fillText(player2.score, $canvas.width - 260, 80);
};

setInterval(draws,10);
