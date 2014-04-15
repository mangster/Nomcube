// Create enemies
var enemies = [];

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
/*function createEnemy(pos, type){
	switch(type){
		case "red":
			enemies.push({
				x: pos.x,
				y: pos.y,
				vx: 0,
				vy: 0,
				path: [],
				target: mapTwoD[2][2],
				radius: 15,
				speed: 2,
				health: 50,
				totalHealth: 50,
				color: "rgba(255, 0, 0, .5)"
			});
			break;
		case "blue":
			enemies.push({
				x: pos[0],
				y: pos[1],
				vx: 0,
				vy: 0,
				path: [],
				target: mapTwoD[2][2],
				radius: 15,
				speed: 2,
				health: 50,
				totalHealth: 50,
				color: "rgba(0, 0, 255, .5)"
			});
			break;
		case "yellow":
			enemies.push({
				x: pos[0],
				y: pos[1],
				vx: 0,
				vy: 0,
				path: [],
				target: mapTwoD[2][2],
				radius: 15,
				speed: 3,
				health: 50,
				totalHealth: 50,
				color: "rgba(255, 255, 0, .5)"
			});
			break;
		default:
			enemies.push({
				x: pos[0],
				y: pos[1],
				vx: 0,
				vy: 0,
				path: [],
				target: mapTwoD[2][2],
				radius: 15,
				speed: 1,
				health: 50,
				totalHealth: 50,
				color: "rgba(255, 255, 255, .5)"
			});
			break;
	}
}
*/
createEnemy(map[2][2].pos, "red");	
	
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