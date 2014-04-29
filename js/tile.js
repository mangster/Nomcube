function Tile (type, xPos, yPos, width, height){  
    this.width = width;
    this.height = height;
    this.volume = this.width * this.width * this.height
    this.screenHeight = worldDistanceToScreenDistance(this.height);

    var cellPoints = getSquareCornersWorld(xPos, yPos, this.width);   
    this.hitBox = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
      new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
      new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
      new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
      new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
    ]);
    
    this.z = this.hitBox.pos.x + this.hitBox.pos.y;

	this.type = type;
    if (this.type == "basic"){
        this.fillColor = "rgba(200, 200, 200, 1)";
        this.strokeColor = "rgba(100, 100, 100, 1)";
        this.leftColor = "rgba(175, 175, 175, 1)";
        this.rightColor = "rgba(150, 150, 150, 1)";
    }
    else if (this.type == "edge"){
        this.fillColor = "rgba(200, 200, 200, 0)";
        this.strokeColor = "rgba(100, 100, 100, 1)";
        this.leftColor = "rgba(175, 175, 175, 0)";
        this.rightColor = "rgba(150, 150, 150, 0)";
    }
    else{
        console.log("something got fucky with the colors");
        this.fillColor = "rgba(0, 0, 0, 1)";
        this.strokeColor = "rgba(0, 0, 0, 1)";
        this.leftColor = "rgba(0, 0, 0, 1)";
        this.rightColor = "rgba(0, 0, 0, 1)";
    }
    this.getScreenPos = function(){
        var worldPos = {};
        worldPos["x"] = this.hitBox.pos.x;
        worldPos["y"] = this.hitBox.pos.y;
        return worldToScreen(worldPos);
    }
    this.hiddenToBasic = function(){
        this.type = "basic";
        this.fillColor = "rgba(200, 200, 200, 1)";
        this.strokeColor = "rgba(100, 100, 100, 1)";
        this.leftColor = "rgba(175, 175, 175, 1)";
        this.rightColor = "rgba(150, 150, 150, 1)";
    }

    // Draw the tile
    this.draw = function (){
        if (isometric){
            //drawcube
            
            //var bottom = this.getScreenSquare(this, -this.screenHeight, true);
            //var top = this.getScreenSquare(this, 0, true);
            var bottom = this.getScreenSquare(this, -this.screenHeight);
            var top = this.getScreenSquare(this, 0);
            //console.log(bottom.hitBox.pos);
            this.drawSquare(bottom, this.fillColor, this.strokeColor);
            this.drawSquare(top, this.fillColor, this.strokeColor);
            

            // Temporary solution for left and right sides
            // Left
            ctx.beginPath();
            ctx.strokeStyle = this.strokeColor;
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
            ctx.strokeStyle = this.strokeColor;
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

    this.getScreenSquare = function (object, heightOffset){
        //TODO move to update-function

        var square = {};
        square.hitBox = {};
        square.hitBox.pos = worldToScreen(object.hitBox.pos);
 
        square.hitBox.pos.y -= heightOffset;
        square.hitBox.points = [];
        for (var i = 0; i < object.hitBox.points.length; i++){
            square.hitBox.points[i] = worldToScreen(object.hitBox.points[i]);
        }
        return square;
    }
}