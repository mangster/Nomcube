function drawEntities(){
    for ( var i = 0; i < entities.length; i++ ) {
        var p = entities[i];
        p.draw();
        //drawWorldSquare(p);
    }
}
var shadow = {}
function drawCube(object){

    var heightOffset = Math.abs(Math.sin(object.jumpStep) * object.jumpHeight);
    // draw shadow
    /*
    var shadowSquare = {};
    shadowSquare.pos = worldToScreen(object.pos);
	shadowSquare.points = [];
	for (var i = 0; i < object.points.length; i++){
		shadowSquare.points[i] = worldToScreen(object.points[i]);
	}
	ctx.beginPath();
	
	ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    
	ctx.moveTo(shadowSquare.pos.x + shadowSquare.points[0].x - camera.x, shadowSquare.pos.y + shadowSquare.points[0].y - camera.y);   
	ctx.lineTo(shadowSquare.pos.x + shadowSquare.points[1].x - camera.x, shadowSquare.pos.y + shadowSquare.points[1].y - camera.y);   
	ctx.lineTo(shadowSquare.pos.x + shadowSquare.points[2].x - camera.x, shadowSquare.pos.y + shadowSquare.points[2].y - camera.y);   
	ctx.lineTo(shadowSquare.pos.x + shadowSquare.points[3].x - camera.x, shadowSquare.pos.y + shadowSquare.points[3].y - camera.y);
	ctx.lineTo(shadowSquare.pos.x + shadowSquare.points[0].x - camera.x, shadowSquare.pos.y + shadowSquare.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
    */
    //var shadow = {};
    var cellPoints = [];
    
    cellPoints = getSquareCornersWorld(object.hitBox.pos.x, object.hitBox.pos.y, object.width);
    var shadow = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
      new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
      new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
      new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
      new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
    ]);
    
    var shadowSquare = {};
    shadowSquare.pos = worldToScreen(shadow.pos);
	shadowSquare.points = [];
    for (var i = 0; i < shadow.points.length; i++){
		shadowSquare.points[i] = worldToScreen(shadow.points[i]);
	}
    
    
    ctx.beginPath();
	
	ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    
	ctx.moveTo(shadowSquare.pos.x + shadowSquare.points[0].x - camera.x, shadowSquare.pos.y + shadowSquare.points[0].y - camera.y);   
	ctx.lineTo(shadowSquare.pos.x + shadowSquare.points[1].x - camera.x, shadowSquare.pos.y + shadowSquare.points[1].y - camera.y);   
	ctx.lineTo(shadowSquare.pos.x + shadowSquare.points[2].x - camera.x, shadowSquare.pos.y + shadowSquare.points[2].y - camera.y);   
	ctx.lineTo(shadowSquare.pos.x + shadowSquare.points[3].x - camera.x, shadowSquare.pos.y + shadowSquare.points[3].y - camera.y);
	ctx.lineTo(shadowSquare.pos.x + shadowSquare.points[0].x - camera.x, shadowSquare.pos.y + shadowSquare.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
    
    
    // draw bottom
    var bottomSquare = {};
    bottomSquare.pos = worldToScreen(object.hitBox.pos);
    // jump
    bottomSquare.pos.y -= heightOffset;
	bottomSquare.points = [];
	for (var i = 0; i < object.hitBox.points.length; i++){
		bottomSquare.points[i] = worldToScreen(object.hitBox.points[i]);
	}
	
	ctx.beginPath();
    ctx.strokeStyle = object.strokeColor;
    ctx.fillStyle = object.fillColor;
    
	ctx.moveTo(bottomSquare.pos.x + bottomSquare.points[0].x - camera.x, bottomSquare.pos.y + bottomSquare.points[0].y - camera.y);   
	ctx.lineTo(bottomSquare.pos.x + bottomSquare.points[1].x - camera.x, bottomSquare.pos.y + bottomSquare.points[1].y - camera.y);   
	ctx.lineTo(bottomSquare.pos.x + bottomSquare.points[2].x - camera.x, bottomSquare.pos.y + bottomSquare.points[2].y - camera.y);   
	ctx.lineTo(bottomSquare.pos.x + bottomSquare.points[3].x - camera.x, bottomSquare.pos.y + bottomSquare.points[3].y - camera.y);
	ctx.lineTo(bottomSquare.pos.x + bottomSquare.points[0].x - camera.x, bottomSquare.pos.y + bottomSquare.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
    
    //Draw top
    var topSquare = {};
    topSquare.pos = worldToScreen(object.hitBox.pos);
    topSquare.pos.y -= object.height;
    topSquare.pos.y -= heightOffset;
	topSquare.points = [];
	for (var i = 0; i < object.hitBox.points.length; i++){
		topSquare.points[i] = worldToScreen(object.hitBox.points[i]);
	}
	ctx.beginPath();
	
	ctx.beginPath();
    ctx.strokeStyle = object.strokeColor;
    ctx.fillStyle = object.fillColor;
    
	ctx.moveTo(topSquare.pos.x + topSquare.points[0].x - camera.x, topSquare.pos.y + topSquare.points[0].y - camera.y);   
	ctx.lineTo(topSquare.pos.x + topSquare.points[1].x - camera.x, topSquare.pos.y + topSquare.points[1].y - camera.y);   
	ctx.lineTo(topSquare.pos.x + topSquare.points[2].x - camera.x, topSquare.pos.y + topSquare.points[2].y - camera.y);   
	ctx.lineTo(topSquare.pos.x + topSquare.points[3].x - camera.x, topSquare.pos.y + topSquare.points[3].y - camera.y);
	ctx.lineTo(topSquare.pos.x + topSquare.points[0].x - camera.x, topSquare.pos.y + topSquare.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
    
    // draw left
    // 0 = left 1 = bottom

	ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 225, 1)";
    ctx.fillStyle = "rgba(0, 0, 225, 1)";
    
	ctx.moveTo(bottomSquare.pos.x + bottomSquare.points[0].x - camera.x, bottomSquare.pos.y + bottomSquare.points[0].y - camera.y);
    ctx.lineTo(topSquare.pos.x + topSquare.points[0].x - camera.x, topSquare.pos.y + topSquare.points[0].y - camera.y);
    ctx.lineTo(topSquare.pos.x + topSquare.points[1].x - camera.x, topSquare.pos.y + topSquare.points[1].y - camera.y);
    ctx.lineTo(bottomSquare.pos.x + bottomSquare.points[1].x - camera.x, bottomSquare.pos.y + bottomSquare.points[1].y - camera.y);
    ctx.lineTo(bottomSquare.pos.x + bottomSquare.points[0].x - camera.x, bottomSquare.pos.y + bottomSquare.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
    
    // draw right
    // 0 = left 1 = bottom 2 = right 3 = top

	ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 200, 1)";
    ctx.fillStyle = "rgba(0, 0, 200, 1)";
    
	ctx.moveTo(bottomSquare.pos.x + bottomSquare.points[1].x - camera.x, bottomSquare.pos.y + bottomSquare.points[1].y - camera.y);
    ctx.lineTo(topSquare.pos.x + topSquare.points[1].x - camera.x, topSquare.pos.y + topSquare.points[1].y - camera.y);
    ctx.lineTo(topSquare.pos.x + topSquare.points[2].x - camera.x, topSquare.pos.y + topSquare.points[2].y - camera.y);
    ctx.lineTo(bottomSquare.pos.x + bottomSquare.points[2].x - camera.x, bottomSquare.pos.y + bottomSquare.points[2].y - camera.y);
    ctx.lineTo(bottomSquare.pos.x + bottomSquare.points[1].x - camera.x, bottomSquare.pos.y + bottomSquare.points[1].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
    
    
    
    
}

function drawScreenSquare (square) {
	var screenSquare = {};
    screenSquare.pos = worldToScreen(square.pos);
	screenSquare.points = [];
	for (var i = 0; i < square.points.length; i++){
		screenSquare.points[i] = worldToScreen(square.points[i]);
	}
	ctx.beginPath();
	
	ctx.beginPath();
    ctx.strokeStyle = square.strokeColor;
    ctx.fillStyle = square.fillColor;
    
	ctx.moveTo(screenSquare.pos.x + screenSquare.points[0].x - camera.x, screenSquare.pos.y + screenSquare.points[0].y - camera.y);   
	ctx.lineTo(screenSquare.pos.x + screenSquare.points[1].x - camera.x, screenSquare.pos.y + screenSquare.points[1].y - camera.y);   
	ctx.lineTo(screenSquare.pos.x + screenSquare.points[2].x - camera.x, screenSquare.pos.y + screenSquare.points[2].y - camera.y);   
	ctx.lineTo(screenSquare.pos.x + screenSquare.points[3].x - camera.x, screenSquare.pos.y + screenSquare.points[3].y - camera.y);
	ctx.lineTo(screenSquare.pos.x + screenSquare.points[0].x - camera.x, screenSquare.pos.y + screenSquare.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();

}

function drawWorldSquare (square) {
    ctx.beginPath();
    ctx.strokeStyle = square.strokeColor;
    ctx.fillStyle = square.fillColor;

	ctx.moveTo(square.hitBox.pos.x + square.hitBox.points[0].x - camera.x, square.hitBox.pos.y + square.hitBox.points[0].y - camera.y);   
	ctx.lineTo(square.hitBox.pos.x + square.hitBox.points[1].x - camera.x, square.hitBox.pos.y + square.hitBox.points[1].y - camera.y);   
	ctx.lineTo(square.hitBox.pos.x + square.hitBox.points[2].x - camera.x, square.hitBox.pos.y + square.hitBox.points[2].y - camera.y);   
	ctx.lineTo(square.hitBox.pos.x + square.hitBox.points[3].x - camera.x, square.hitBox.pos.y + square.hitBox.points[3].y - camera.y);
	ctx.lineTo(square.hitBox.pos.x + square.hitBox.points[0].x - camera.x, square.hitBox.pos.y + square.hitBox.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}


function drawWorldCircle (circle) {
	ctx.beginPath();
	var radius = circle.r;
	ctx.lineWidth=1;
	ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.arc(circle.pos.x - camera.x,circle.pos.y - camera.y,radius,0,2*Math.PI);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

function drawWorldTile (tile) {
    ctx.beginPath();
    
    if (tile.type === 1){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(0, 255, 0, 1)";
	}
	else if (tile.type === 0){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(100, 100, 100, 1)";
	}
	else{
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
	}

	ctx.moveTo(tile.pos.x + tile.points[0].x - camera.x, tile.pos.y + tile.points[0].y - camera.y);   
	ctx.lineTo(tile.pos.x + tile.points[1].x - camera.x, tile.pos.y + tile.points[1].y - camera.y);   
	ctx.lineTo(tile.pos.x + tile.points[2].x - camera.x, tile.pos.y + tile.points[2].y - camera.y);   
	ctx.lineTo(tile.pos.x + tile.points[3].x - camera.x, tile.pos.y + tile.points[3].y - camera.y);
	ctx.lineTo(tile.pos.x + tile.points[0].x - camera.x, tile.pos.y + tile.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
    
    if (tile.selected){
		ctx.strokeStyle = "rgba(255, 255, 255, 0)";
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.moveTo(tile.pos.x + tile.points[0].x - camera.x, tile.pos.y + tile.points[0].y - camera.y);   
        ctx.lineTo(tile.pos.x + tile.points[1].x - camera.x, tile.pos.y + tile.points[1].y - camera.y);   
        ctx.lineTo(tile.pos.x + tile.points[2].x - camera.x, tile.pos.y + tile.points[2].y - camera.y);   
        ctx.lineTo(tile.pos.x + tile.points[3].x - camera.x, tile.pos.y + tile.points[3].y - camera.y);
        ctx.lineTo(tile.pos.x + tile.points[0].x - camera.x, tile.pos.y + tile.points[0].y - camera.y);

        ctx.stroke();
        ctx.fill();
        ctx.closePath();
	}
    if (tile.collided){
		ctx.strokeStyle = "rgba(255, 0, 0, 0)";
		ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
        ctx.moveTo(tile.pos.x + tile.points[0].x - camera.x, tile.pos.y + tile.points[0].y - camera.y);   
        ctx.lineTo(tile.pos.x + tile.points[1].x - camera.x, tile.pos.y + tile.points[1].y - camera.y);   
        ctx.lineTo(tile.pos.x + tile.points[2].x - camera.x, tile.pos.y + tile.points[2].y - camera.y);   
        ctx.lineTo(tile.pos.x + tile.points[3].x - camera.x, tile.pos.y + tile.points[3].y - camera.y);
        ctx.lineTo(tile.pos.x + tile.points[0].x - camera.x, tile.pos.y + tile.points[0].y - camera.y);

        ctx.stroke();
        ctx.fill();
        ctx.closePath();
	}
}


function drawScreenTile (tile) {
    
    var square = {};
    square.pos = worldToScreen(tile.pos);
	square.points = [];
	for (var i = 0; i < tile.points.length; i++){
		square.points[i] = worldToScreen(tile.points[i]);
	}
    
	ctx.beginPath();
	
	ctx.beginPath();
    if (tile.type === 1){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(0, 255, 0, 1)";
	}
	else if (tile.type === 0){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(100, 100, 100, 1)";
	}
	else{
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
	}
    
	ctx.moveTo(square.pos.x + square.points[0].x - camera.x, square.pos.y + square.points[0].y - camera.y);   
	ctx.lineTo(square.pos.x + square.points[1].x - camera.x, square.pos.y + square.points[1].y - camera.y);   
	ctx.lineTo(square.pos.x + square.points[2].x - camera.x, square.pos.y + square.points[2].y - camera.y);   
	ctx.lineTo(square.pos.x + square.points[3].x - camera.x, square.pos.y + square.points[3].y - camera.y);
	ctx.lineTo(square.pos.x + square.points[0].x - camera.x, square.pos.y + square.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
    
    if (tile.selected){
		ctx.strokeStyle = "rgba(255, 255, 255, 0)";
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.moveTo(square.pos.x + square.points[0].x - camera.x, square.pos.y + square.points[0].y - camera.y);   
        ctx.lineTo(square.pos.x + square.points[1].x - camera.x, square.pos.y + square.points[1].y - camera.y);   
        ctx.lineTo(square.pos.x + square.points[2].x - camera.x, square.pos.y + square.points[2].y - camera.y);   
        ctx.lineTo(square.pos.x + square.points[3].x - camera.x, square.pos.y + square.points[3].y - camera.y);
        ctx.lineTo(square.pos.x + square.points[0].x - camera.x, square.pos.y + square.points[0].y - camera.y);

        ctx.stroke();
        ctx.fill();
        ctx.closePath();
	}
    
    if (tile.collided){
		ctx.strokeStyle = "rgba(255, 0, 0, 0)";
		ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
        ctx.moveTo(square.pos.x + square.points[0].x - camera.x, square.pos.y + square.points[0].y - camera.y);   
        ctx.lineTo(square.pos.x + square.points[1].x - camera.x, square.pos.y + square.points[1].y - camera.y);   
        ctx.lineTo(square.pos.x + square.points[2].x - camera.x, square.pos.y + square.points[2].y - camera.y);   
        ctx.lineTo(square.pos.x + square.points[3].x - camera.x, square.pos.y + square.points[3].y - camera.y);
        ctx.lineTo(square.pos.x + square.points[0].x - camera.x, square.pos.y + square.points[0].y - camera.y);

        ctx.stroke();
        ctx.fill();
        ctx.closePath();
	}
}

function drawEllipseByCenter(cx, cy, w, h) {
  drawEllipse(cx - w/2.0, cy - h/2.0, w, h);
}

function drawEllipse(x, y, w, h) {
	var kappa = .5522848;
	var ox = (w / 2) * kappa; // control point offset horizontal
	var oy = (h / 2) * kappa; // control point offset vertical
	var xe = x + w;          // x-end
	var ye = y + h;           // y-end
	var xm = x + w / 2;       // x-middle
	var ym = y + h / 2;       // y-middle

	ctx.beginPath();
	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}