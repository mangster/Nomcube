function createPlayer (x, y, type, width, height){
    var cellPoints = getSquareCorners(x, y, width);
    var object = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
      new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
      new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
      new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
      new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
    ]);
    object.height = worldDistanceToScreenDistance(height);  
	object.vx = 0;
	object.vy = 0;
    object.jumpHeight = object.height/1.5;
    object.jumpStep = 0;
    object.jumpSpeed = 0.1;
	object.speed = 1.5;
	object.type = type;
    object.fillColor = "rgba(0, 0, 255, 1)";
    object.strokeColor = "rgba(0, 0, 255, 1)";
	entities.push(object);
}

createPlayer(0, 0, "player", 15, 30);	