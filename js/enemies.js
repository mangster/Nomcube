// Create enemies

/*
function createEnemy (pos, type){
	var radius = 1*blockSize/2;
	var circle = new SAT.Circle(new SAT.Vector(pos.x,pos.y), radius);
	circle.vx = 0;
	circle.vy = 0;
	circle.path = [];
	circle.target = map[5][5];
	circle.speed = 2;
	circle.totalHealth = 50;
	circle.health = circle.totalHealth;
	circle.type = type;
	entities.push(circle);
}

createEnemy(map[2][2].pos, "red");	
*/
	
function drawEnemies(){
	if (isometric){
		for ( var i = 0; i < entities.length; i++ ) {
			var p = entities[i];			
			drawScreenEnemy(p);
		}
	}
	else{
		//draw 2d
		for ( var i = 0; i < entities.length; i++ ) {
			var p = entities[i];			
			drawWorldCircle(p);
		}
	}
	
}

function updateEnemies(){
	if (entities.length > 0){
		for ( var i = 0; i < entities.length; i++ ) {
			
			//check health of enemies
			var p = entities[i];
			if (p.health <= 0){
				entities.splice(i, 1);
			}
			p.pos.x += 1;
			p.pos.y += 1;
		}
	}
}