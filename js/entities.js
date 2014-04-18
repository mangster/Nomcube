function drawEntities(){
    for ( var i = 0; i < entities.length; i++ ) {
        var p = entities[i];
        p.draw();
    }
}
function Entity (type, xPos, yPos, width, height){
    var cellPoints = getSquareCornersWorld(xPos, yPos, width);
    this.hitBox = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
      new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
      new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
      new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
      new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
    ]);
    this.height = height;
    this.screenHeight = worldDistanceToScreenDistance(height);
    this.width = width;
    this.vx = (Math.random()-0.5)*5;
    this.vy = (Math.random()-0.5)*5;
    this.jumpHeight = this.height/2;
    this.jumpStep = Math.random();
    this.jumpSpeed = 0.2;
	this.speed = Math.random()+1;
	this.type = type;
    this.fillColor = "rgba(0, 0, 255, 1)";
    this.strokeColor = "rgba(0, 0, 255, 1)";
    this.leftColor = "rgba(0, 0, 225, 1)";
    this.rightColor = "rgba(0, 0, 200, 1)";
    this.shadowColor = "rgba(0, 0, 0, 0.2)";
    
    // Draw the entity
    this.draw = function (){
        if (isometric){
            //drawcube
            
            var shadow = this.getScreenSquare(this, 0, false);
            var bottom = this.getScreenSquare(this, 0, true);
            var top = this.getScreenSquare(this, this.screenHeight, true);
            
            this.drawSquare(shadow, this.shadowColor, this.shadowColor);
            this.drawSquare(bottom, this.fillColor, this.strokeColor);
            this.drawSquare(top, this.fillColor, this.strokeColor);
            

            // Temporary solution for left and right sides
            // Left
            ctx.beginPath();
            ctx.strokeStyle = this.leftColor;
            ctx.fillStyle = this.leftColor;

            ctx.moveTo(bottom.hitBox.pos.x + bottom.hitBox.points[0].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[0].y - camera.y);
            ctx.lineTo(top.hitBox.pos.x + top.hitBox.points[0].x - camera.x, top.hitBox.pos.y + top.hitBox.points[0].y - camera.y);
            ctx.lineTo(top.hitBox.pos.x + top.hitBox.points[1].x - camera.x, top.hitBox.pos.y + top.hitBox.points[1].y - camera.y);
            ctx.lineTo(bottom.hitBox.pos.x + bottom.hitBox.points[1].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[1].y - camera.y);
            ctx.lineTo(bottom.hitBox.pos.x + bottom.hitBox.points[0].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[0].y - camera.y);

            ctx.stroke();
            ctx.fill();
            ctx.closePath();
            
            // Right
            ctx.beginPath();
            ctx.strokeStyle = this.rightColor;
            ctx.fillStyle = this.rightColor;

            ctx.moveTo(bottom.hitBox.pos.x + bottom.hitBox.points[1].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[1].y - camera.y);
            ctx.lineTo(top.hitBox.pos.x + top.hitBox.points[1].x - camera.x, top.hitBox.pos.y + top.hitBox.points[1].y - camera.y);
            ctx.lineTo(top.hitBox.pos.x + top.hitBox.points[2].x - camera.x, top.hitBox.pos.y + top.hitBox.points[2].y - camera.y);
            ctx.lineTo(bottom.hitBox.pos.x + bottom.hitBox.points[2].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[2].y - camera.y);
            ctx.lineTo(bottom.hitBox.pos.x + bottom.hitBox.points[1].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[1].y - camera.y);

            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        else{
            this.drawSquare(this, this.fillColor, this.strokeColor);
        }
    }
    // Draw square
    this.drawSquare = function (object, fill, stroke){
        ctx.beginPath();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.moveTo(object.hitBox.pos.x + object.hitBox.points[0].x - camera.x, object.hitBox.pos.y + object.hitBox.points[0].y - camera.y);   
        ctx.lineTo(object.hitBox.pos.x + object.hitBox.points[1].x - camera.x, object.hitBox.pos.y + object.hitBox.points[1].y - camera.y);   
        ctx.lineTo(object.hitBox.pos.x + object.hitBox.points[2].x - camera.x, object.hitBox.pos.y + object.hitBox.points[2].y - camera.y);   
        ctx.lineTo(object.hitBox.pos.x + object.hitBox.points[3].x - camera.x, object.hitBox.pos.y + object.hitBox.points[3].y - camera.y);
        ctx.lineTo(object.hitBox.pos.x + object.hitBox.points[0].x - camera.x, object.hitBox.pos.y + object.hitBox.points[0].y - camera.y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    this.getScreenSquare = function (object, heightOffset, jumping){
        //TODO move to update-function
        var jumpOffset = Math.abs(Math.sin(object.jumpStep) * object.jumpHeight);
        var square = {};
        square.hitBox = {};
        square.hitBox.pos = worldToScreen(object.hitBox.pos);
        if (jumping){
            square.hitBox.pos.y -= jumpOffset;
        }  
        square.hitBox.pos.y -= heightOffset;
        square.hitBox.points = [];
        for (var i = 0; i < object.hitBox.points.length; i++){
            square.hitBox.points[i] = worldToScreen(object.hitBox.points[i]);
        }
        return square;
    }
    
    // Add to entity-list
	entities.push(this);
}

//createPlayer(Math.random() * mapWidth, Math.random() * mapHeight, "player", Math.random() * 40, Math.random() * 60);	
player = new Entity("player", 10, 10, 15, 15);
poop = new Entity("player", 15, 15, 50, 50);