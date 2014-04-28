function Camera() {
    var screenPos = {};
    var worldPos = {};
    //TODO byt ut mot dynamisk koll av players position
    worldPos["x"] = 200;
    worldPos["y"] = 200;
    screenPos = worldToScreen(worldPos);
    //console.log(canvas.width);
    this.x = screenPos.x -canvas.width/2;
    this.y = screenPos.y -canvas.height/2;
    this.update = function() {
        //this.x = player.hitBox.pos.x;
        //this.y = player.hitBox.pos.y;
        
        //this.x += this.vx / FPS;
        //this.y += this.vy / FPS;
    }
}
var camera = new Camera();