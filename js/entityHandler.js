//TODO move to init()
var entityHandler = new EntityHandler();
//var player = {}
entityHandler.createPlayer();


//Entity handler class
function EntityHandler(){
    this.maxEnemySize = 150000;
    this.minEnemySize = 10000;
    this.entities = [];
    this.createEnemy = function(){
        //create enemy
        var xPos = Math.random()*mapWidth;
        var yPos = 0;
        var size = (Math.random()*(this.maxEnemySize-this.minEnemySize))+this.minEnemySize;
        var direction = 90; //screen south west
        var speed = (size/3) / this.minEnemySize;
        var heightScale = 1.5;
        var width = Math.pow((size / heightScale), 1/3);
        var height = width * heightScale;
        var jumpHeight = height/2;
        var jumpSpeed = 0.2;
            
        var enemy = new Entity("enemy", xPos, yPos, size, direction, speed, heightScale, jumpHeight, jumpSpeed);
        this.entities.push(enemy);
    }
    this.createPlayer = function(){
        var xPos = 0;
        var yPos = 0;
        var size = 30000;
        var direction = 90;
        var speed = 5;
        var heightScale = 1.5;
        var width = Math.pow((size / heightScale), 1/3);
        var height = width * heightScale;
        var jumpHeight = height/2;
        var jumpSpeed = 0.2;
        this.player = new Entity("player", xPos, yPos, size, direction, speed, heightScale, jumpHeight, jumpSpeed);

        this.entities.push(this.player);
    }
    this.update = function(){
        //sort by depth
        this.entities.sort(compareZ);
        //move all entities
        for ( var i = 0; i < entityHandler.entities.length; i++ ) {
            var p = entityHandler.entities[i];
            p.move();
            //if entity reached the end of the map
            if (p.hitBox.pos.y > mapHeight && p.type != "player"){
                //kill entity
                this.entities.splice(i,1);
            }
            if(p.type != "player"){
                var response = new SAT.Response();
                var collided = SAT.testPolygonPolygon(this.player.hitBox, p.hitBox, response);
                if (collided){
                    if (p.volume < this.player.volume){
                        p.fillColor = "red";
                        this.player.addVolume(p.volume);
                        //this.minEnemySize += p.volume;
                        //this.maxEnemySize += p.volume;
                        this.maxEnemySize *= 1.1;

                        this.entities.splice(i,1);
                    }
                    else{
                        this.player.fillColor = "black";
                    }
                    
                }
            }
        }

    }
    this.kill = function(entity){
        //remove entity from entity list
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