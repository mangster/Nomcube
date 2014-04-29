// Get the canvas element
var canvas = document.getElementById( "canvas" );
// Get our 2D context for drawing
var ctx = canvas.getContext( "2d" );

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;


var mapWidth = 1000;
var mapHeight = 1000;



var map = new Map();

map.createTile("basic", -50, 0);
map.createTile("basic", -50, -50);
map.createTile("basic", -50, 50);
map.createTile("basic", 50, -50);
map.createTile("basic", 0, -50);
map.createTile("basic", 0, 0);
map.createTile("basic", 50, 0);
map.createTile("basic", 50, 50);
map.createTile("basic", 0, 50);




//Map Class
function Map(){
    this.tileSize = 50;
    this.tiles = [];

    
    
    this.createTile = function(type, xPos, yPos){
        var hasHidden = false;
        for (var i = 0; i < this.tiles.length; i++){
            if (this.tiles[i].hitBox.pos.x == xPos && this.tiles[i].hitBox.pos.y == yPos){
                this.tiles[i].hiddenToBasic();
                hasHidden = true;
            }
        }
        if (!hasHidden){
            //create tile 
            var tile = new Tile("basic", xPos, yPos, this.tileSize, this.tileSize/3);

            this.tiles.push(tile);
        }
        //create neighbour grid
        var neighbours = [];
        for (var j = 0; j <3; j++){
            var row = [];
            for (var k = 0; k < 3; k++){
                var neighbour = [];
                neighbour.hasTile = false;
                neighbour.pos = {};
                neighbour.pos ={ "x": xPos + (this.tileSize * (k-1)), "y": yPos + (this.tileSize * (j-1))};
                row.push(neighbour);
            }
            neighbours.push(row);
        }
        
        // Check which neighbours have a tile
        for (var j = 0; j <3; j++){
            for (var k = 0; k < 3; k++){
                var neighbour = neighbours[j][k];
                for (var i = 0;  i < this.tiles.length; i++){
                    var compareTile = this.tiles[i];
                    var point = new SAT.Vector(neighbour.pos.x, neighbour.pos.y);
                    var hasNeighbour = SAT.pointInPolygon(point, compareTile.hitBox);
                    if (hasNeighbour){
                        neighbours[j][k].hasTile = true;
                    }
                }
            }
        }
        // Create hidden tiles for all neighbours that dont have a tile
        for (var j = 0; j <3; j++){
            for (var k = 0; k < 3; k++){
                var neighbour = neighbours[j][k];
                if (neighbour.hasTile == false){
                    var hiddenTile = new Tile("edge", neighbour.pos.x , neighbour.pos.y, this.tileSize, this.tileSize/3);
                    this.tiles.push(hiddenTile);
                }
            }
        }
    }

    this.update = function(){
        //sort by depth
        this.tiles.sort(compareZ);
        //move all entities
        for ( var i = 0; i < this.tiles.length; i++ ) {
            var p = this.tiles[i];
            //p.move();
        }
    }

    this.draw = function(){
        //draw all tiles
        for ( var i = 0; i < this.tiles.length; i++ ) {
            var p = this.tiles[i];
            p.draw();
        }
    }
}

/*
//Skapa random karta
var grid = generateRandom(mapWidth/blockSize, mapHeight/blockSize, 0.1);
var map = [];

var nodes = [];
var row = [];

//create 2d-representation of the map
for (var i = 0; i < grid.nodes.length; i++){
	row = [];
	for (var j = 0; j < grid.nodes[i].length; j++){
		var tile = grid.nodes[i][j];
        var cellPoints = getSquareCornersWorld(tile.x * blockSize, tile.y * blockSize, blockSize);
		//var cellPoints = getWorldSquareBoundaries(tile.x, tile.y);
		var polygon = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
		  new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
		  new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
		  new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
		  new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
		]);
		polygon.type = tile.type;
		//polygon.pos = mapToTwoD(tile.pos, 0);
		//tile.twoDRef = polygon;
		row.push(polygon);
	}
	map.push(row);
}


}

function drawMap(){
    //TODO flytta ut?
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	//TODO lägg till en koll om blocket syns på canvasen, rita inte ut om ej
	if (isometric){
		for (var i = 0; i < map.length; i++){
			for (var j = map[i].length -1; j >= 0; j--){i
				var tile = map[i][j];
				drawScreenTile(tile);
			}
		}
	}
	else{
		for (var i = 0; i < map.length; i++){
			for (var j = 0; j < map[i].length; j++){
				var tile = map[i][j];
				drawWorldTile(tile);
			}
		}
	}
}
*/