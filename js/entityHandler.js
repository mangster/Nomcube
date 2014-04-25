//TODO move to init()
var entityHandler = new EntityHandler();
//var player = {}
entityHandler.createPlayer();


//Entity handler class
function EntityHandler(){
    this.maxEnemySize = 50000;
    this.minEnemySize = 10000;
    this.entities = [];
    this.createEnemy = function(){
        //create enemy
        var xPos = Math.random()*mapWidth;
        var yPos = 0;
        var width = (Math.random()*(this.maxEnemySize-this.minEnemySize))+this.minEnemySize;
        var direction = 90; //screen south west
        var speed = 2;
        var heightScale = 1.5;
            
        var enemy = new Entity("enemy", xPos, yPos, width, direction, speed, heightScale);
        this.entities.push(enemy);
    }
    this.createPlayer = function(){
        this.player = new Entity("player", 200, 200, 30000, 90, 5, 1.5);

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
                        this.minEnemySize += p.volume;
                        this.maxEnemySize += p.volume;

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