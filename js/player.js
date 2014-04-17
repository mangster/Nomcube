function createPlayer (x, y, type, width, height){
    //TODO skapa objekt med center vid inkoordinaten!
    var cellPoints = getSquareCornersWorld(x, y, width);
    var object = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
      new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
      new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
      new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
      new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
    ]);
    object.height = worldDistanceToScreenDistance(height);
    object.width = width;
	object.vx = (Math.random()-0.5)*5;
	object.vy = (Math.random()-0.5)*5;
    object.jumpHeight = object.height/2;
    object.jumpStep = Math.random();
    object.jumpSpeed = 0.2;
	object.speed = Math.random()+1;
	object.type = type;
    //object.fillColor = "rgba(0, 0, 255, 1)";
    //object.strokeColor = "rgba(0, 0, 255, 1)";
    object.fillColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    object.strokeColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	entities.push(object);
}

createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	