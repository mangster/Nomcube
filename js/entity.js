function Entity (type, xPos, yPos, volume, direction, speed, heightScale){  
    //this.width = width;
    this.heightScale = heightScale;
    this.volume = volume;
    this.width = Math.pow((this.volume / this.heightScale), 1/3);
    
    this.height = this.width * this.heightScale;
    this.screenHeight = worldDistanceToScreenDistance(this.height);

    var cellPoints = getSquareCornersWorld(xPos, yPos, this.width);
    this.hitBox = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
      new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
      new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
      new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
      new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
    ]);

    
    
    this.z = this.hitBox.pos.x + this.hitBox.pos.y;

    this.speed = speed;
    this.direction = direction;
    this.theta = this.direction * Math.PI / 180;
    this.vx = this.speed * Math.cos(this.theta);
    this.vy = this.speed * Math.sin (this.theta);
    
    this.jumpHeight = this.height/2;
    this.jumpStep = Math.random();
    this.jumpSpeed = 0.2;

	this.type = type;
    if (this.type == "enemy"){
        this.fillColor = "rgba(0, 0, 255, 1)";
        this.strokeColor = "rgba(0, 0, 255, 1)";
        this.leftColor = "rgba(0, 0, 225, 1)";
        this.rightColor = "rgba(0, 0, 200, 1)";
        this.shadowColor = "rgba(0, 0, 0, 0.2)";
    }
    else if (this.type == "player"){
        this.fillColor = "rgba(255, 0, 0, 1)";
        this.strokeColor = "rgba(255, 0, 0, 1)";
        this.leftColor = "rgba(225, 0, 0, 1)";
        this.rightColor = "rgba(200, 0, 0, 1)";
        this.shadowColor = "rgba(0, 0, 0, 0.2)";
    }
    else{
        console.log("something got fucky with the colors");
        this.fillColor = "rgba(0, 0, 0, 1)";
        this.strokeColor = "rgba(0, 0, 0, 1)";
        this.leftColor = "rgba(0, 0, 0, 1)";
        this.rightColor = "rgba(0, 0, 0, 1)";
        this.shadowColor = "rgba(0, 0, 0, 0.2)";
    }
    this.getScreenPos = function(){
        var worldPos = {};
        worldPos["x"] = this.hitBox.pos.x;
        worldPos["y"] = this.hitBox.pos.y;
        return worldToScreen(worldPos);
    }
    this.getWidthFromVolume = function (volume){
        return Math.pow((volume / this.heightScale), 1/3);
    }
    this.getVolumeFromWidth = function(width){
        return width * width * width * this.heightScale;
    }
    //this.volume = this.getVolumeFromWidth (this.width);
        
    this.scaleVolume = function(scaleFactor){
        //set new volume
        this.volume *= scaleFactor;
        this.width = this.getWidthFromVolume(this.volume);
        this.height = this.width * this.heightScale;
        this.screenHeight = worldDistanceToScreenDistance(this.height);
        var cellPoints = getSquareCornersWorld(this.hitBox.pos.x, this.hitBox.pos.y, this.width);
        this.hitBox = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
          new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
          new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
          new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
          new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
        ]);
    }
    this.addVolume = function(volume){
        //set new volume
        this.volume += volume;
        this.width = this.getWidthFromVolume(this.volume);
        this.height = this.width * this.heightScale;
        this.screenHeight = worldDistanceToScreenDistance(this.height);
        var cellPoints = getSquareCornersWorld(this.hitBox.pos.x, this.hitBox.pos.y, this.width);
        this.hitBox = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
          new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
          new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
          new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
          new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
        ]);
    }
    
    this.move = function(){
        //move the entity
        if (this.type == "enemy"){
            this.hitBox.pos.x += this.vx;
            this.hitBox.pos.y += this.vy;
            this.jumpStep += this.jumpSpeed;
            this.z = this.hitBox.pos.x + this.hitBox.pos.y;
        }
        else if (this.type == "player"){
            var y = 0;
            var x = 0;

            if (left){
                x -= 1;
            }
            if (right){
                x += 1;
            }
            if (up){
                y -= 1;
            }
            if (down){
                y += 1;
            }
            if(y != 0 || x != 0){
                // get direction
                var screenDirection = Math.atan2(y,x);
                screenDirection *= 180/Math.PI;
                
                //convert to world direction
                this.direction = screenDirection - 45;
                
                //move
                this.theta = this.direction * Math.PI / 180;
                this.vx = this.speed * Math.cos(this.theta);
                this.vy = this.speed * Math.sin (this.theta);
                this.hitBox.pos.x += this.vx;
                this.hitBox.pos.y += this.vy;
                
                var cameraPos = {};
                cameraPos["x"] = this.hitBox.pos.x;
                cameraPos["y"] = this.hitBox.pos.y;
                cameraPos = worldToScreen(cameraPos);
                
                camera.x = cameraPos["x"] -canvas.width/2;
                camera.y = cameraPos["y"] -canvas.height/2;
            }
            this.jumpStep += this.jumpSpeed;
            this.z = this.hitBox.pos.x + this.hitBox.pos.y;
        }
        else{
            console.log("invalid entity type, cant move ffs");
        }      
    }
    
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
}