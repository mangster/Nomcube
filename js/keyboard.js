var up = false;
var right = false;
var down = false;
var left = false;
var keyX = 0;
var keyY = 0;
window.onkeydown = function(e){
    e = e || window.event;
    var code = e.keyCode;
    if ( code === 37 ) {
        // Left key
        camera.vx = -camera.speed;
        left = true;
        keyX = -1;
    } 
    else if ( code === 38 ) {
        // Up key
        camera.vy = -camera.speed;
        up = true;
        keyY = -1;
    } 
    else if ( code === 39 ) {
        // Right key
        right = true;
        keyX = 1;
        camera.vx = camera.speed;
    } 
    else if ( code === 40 ) {
        // Down key
        down = true;
        keyY = 1;
        camera.vy = camera.speed;
    }
    else if ( code === 73 ) {
        // "I" key
        if (isometric){
            isometric = false;
        }
        else{
            isometric = true;
        }
    }
};

window.onkeyup = function(e){
    e = e || window.event;
    var code = e.keyCode;
    if ( code === 37 ) {
        // Left key
        left = false;
        keyX = 0;
        camera.vx = 0;
    } 
    else if ( code === 38 ) {
        // Up key
        up = false;
        keyY = 0;
        camera.vy = 0;
    } 
    else if ( code === 39 ) {
        // Right key
        right = false;
        keyX = 0;
        camera.vx = 0;
    } else if ( code === 40 ) {
        // Down key
        down = false;
        keyY = 0;
        camera.vy = 0;
    }
	

};