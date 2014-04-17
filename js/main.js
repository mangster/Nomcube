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

var entities = [];

test = new Image();
test.src= "img/test.png";
tower = new Image();
tower.src= "img/tower.png";

function updateEntities(){
	if (entities.length > 0){
		for ( var i = 0; i < entities.length; i++ ) {
			
			//check health of enemies
			var p = entities[i];
			if (p.health <= 0){
				entities.splice(i, 1);
			}
			p.pos.x += p.speed;
			//p.pos.y += p.speed;
            p.jumpStep += p.jumpSpeed;
            
            for (var i = 0; i < map.length; i++){
                for (var j = 0; j < map[i].length; j++){
                    var tile = map[i][j];
                    var response = new SAT.Response();
                    var collided = SAT.testPolygonPolygon(p, tile, response);
                    if (collided && isometric){
                        tile.selected = true;
                        console.log(response.b.points[0]);
                    }
                }
            }
		}
	}
}


// Game loop draw function
function draw() {
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	drawMap();
	//drawBullets();
    drawEntities();
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
    updateEntities();
}

//TODO ändra till requestanimationframe?

function tick() {
    draw();
    update(); 
	
}

setInterval( tick, 1000 / FPS );
