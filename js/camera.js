var camera = {
	x: -canvas.width,
	y: -canvas.height,
	vx: 0,
	vy: 0,
	speed: 400,
	// TODO: gå inte för långt bort från kartan
	update: function() {
		//if ((this.x + this.vx / FPS > -blockSize * 2) && this.x + this.vx / FPS < mapWidth + blockSize * 2 - canvas.width){
			this.x += this.vx / FPS;
		//}
		//if ((this.y + this.vy / FPS > -blockSize * 2) && this.y + this.vy / FPS < mapHeight + blockSize * 2 - canvas.height){
			this.y += this.vy / FPS;
		//}
    }
}
