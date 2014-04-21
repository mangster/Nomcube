var entityHandler = new EntityHandler();
var player = entityHandler.createPlayer();

function EntityHandler(){
    
    this.entities = [];
    this.createEnemy = function(){
        //create enemy
        var enemy = new Entity("enemy", 15, 15, 50, 50, 90, 2);
        this.entities.push(enemy);
    }
    this.createPlayer = function(){
        player = new Entity("player", 200, 200, 30, 50, 90, 5);
        this.entities.push(player);
    }
    this.update = function(){
        for ( var i = 0; i < entityHandler.entities.length; i++ ) {
            var p = entityHandler.entities[i];
            p.move();
        }
        
        //check collision
        /*
        var response = new SAT.Response();
            var collided = SAT.testPolygonPolygon(p.hitBox, tile, response);
            if (collided){
                //tile.collided = true;
            }
        */
    }
    this.sort = function(){
        //sort entities by x+y coord
    }
    this.draw = function(){
        //draw all entities
        for ( var i = 0; i < entityHandler.entities.length; i++ ) {
            var p = entityHandler.entities[i];
            p.draw();
        }
    }
    
}
setInterval(function(){entityHandler.createEnemy()},1000);

function Entity (type, xPos, yPos, width, height, direction, speed){
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
        this.fillColor = "rgba(0, 0, 0, 1)";
        this.strokeColor = "rgba(0, 0, 0, 1)";
        this.leftColor = "rgba(0, 0, 0, 1)";
        this.rightColor = "rgba(0, 0, 0, 1)";
        this.shadowColor = "rgba(0, 0, 0, 0.2)";
    }
    
    this.move = function(){
        //move the entity
        //TODO GÖR ENKLARE FÖR ENEMIES SOM ALLTID RÖR SIG I EN RIKTNING
        if (this.type == "enemy"){
            this.hitBox.pos.x += this.vx;
            this.hitBox.pos.y += this.vy;
            this.jumpStep += this.jumpSpeed;
        }
        else if (this.type == "player"){
            if(keyY != 0 || keyX != 0){
                // get direction
                var screenDirection = Math.atan2(keyY,keyX);
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