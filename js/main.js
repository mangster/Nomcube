// Frames-per-second
var FPS = 30;
var isometric = true;

function render() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
	drawMap();
    entityHandler.draw();
	drawMenu();
     
    requestAnimationFrame( render );
}
 
function gameStep() {
    camera.update(); 
    updateMap();
    entityHandler.update();
    setTimeout( gameStep, 1000 / FPS );
}

render()
gameStep()