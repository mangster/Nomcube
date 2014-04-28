var rect = document.getElementById("canvas").getBoundingClientRect();

// Get canvas offset
var offset = {
    x: rect.left,
    y: rect.top
};

/*
// zoom functionality
window.onmousewheel = function(e) {
	//TODO handle firefox
	if (e.wheelDelta > 0){
		blockSize *= 1.1;
	}
	else{
		blockSize *= 0.9;
	}
}
*/
window.onmousedown = function(e) {
    // IE
    e = e || window.event;
    
    // get event location
	var location = {
        x: e.pageX + camera.x,
        y: e.pageY - offset.y + camera.y
    };
	if (isometric){
		var worldLocation = screenToWorld(location);
    }
	else {
		var tileNo = worldToGrid(location);
	}
};

window.onmousemove = function( e ) {
	// IE
    e = e || window.event;
	var location = {
        x: e.pageX + camera.x,
        y: e.pageY - offset.y + camera.y
    };

};