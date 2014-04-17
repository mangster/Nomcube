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
	object.vx = 0;
	object.vy = 0;
    object.jumpHeight = object.height/2;
    object.jumpStep = 0;
    object.jumpSpeed = 0.2;
	object.speed = 1.5;
	object.type = type;
    object.fillColor = "rgba(0, 0, 255, 1)";
    object.strokeColor = "rgba(0, 0, 255, 1)";
	entities.push(object);
}

createPlayer(100, 100, "player", 15, 30);	