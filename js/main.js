// Get the canvas element
var canvas = document.getElementById( "canvas" );
// Get our 2D context for drawing
var ctx = canvas.getContext( "2d" );

// Frames-per-second
var FPS = 30;

var blockSize = 50;
var cellWidth = blockSize;
var cellHeight = blockSize;
var mapWidth = 1000;
var mapHeight = 1000;
var isometric = true;

// Game loop draw function
function draw() {
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	drawMap();
	//drawBullets();
    //drawEntities();
    entityHandler.draw();
	//drawTowers();
	drawMenu();
	
	
	
}
// Game loop update function
function update() {
	camera.update();
	//updateTowers();
	updateMap();
	//updateBullets();
	//updateEnemies();
    //updateEntities();
    entityHandler.update();
}

//TODO ändra till requestanimationframe?

function tick() {
    draw();
    update(); 
	
}

setInterval( tick, 1000 / FPS );
