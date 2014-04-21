/*
// Påbörjad kod för att modda färger
else if(color instanceof Object &amp;&amp; color.r) {
                 result = {
                        r: Math.max(0,Math.min(255,Math.round(parseInt(color.r) - (Math.round((parseInt(color.r))*$percentage_adjuster)  )))),
                        g: Math.max(0,Math.min(255,Math.round(parseInt(color.g) - (Math.round((parseInt(color.g))*$percentage_adjuster)  )))),
                        b: Math.max(0,Math.min(255,Math.round(parseInt(color.b) - (Math.round((parseInt(color.b))*$percentage_adjuster)  ))))
                }
                return result;
*/

function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
};

//Genererar en random karta
function generateRandom (width, height, wallFrequency) {

	var nodes = [];

    for (var x=0; x < width; x++) {
    	var nodeRow = [];
    	var gridRow = [];

    	for(var y=0; y < height; y++) {

    		var isWall = Math.floor(Math.random()*(1/wallFrequency));
    		if(isWall == 0) {
    			nodeRow.push(GraphNodeType.WALL);
    		}
    		else  {
    			nodeRow.push(GraphNodeType.OPEN);
    		}
    	}
    	nodes.push(nodeRow);
    }


    return new Graph(nodes);
};
//TODO create a new function for to see if coord is in screen view
/*
function inView(xIn, yIn){
	if (xIn > (camera.x - blockSize) && xIn < (camera.x + canvas.width + blockSize)
		&& yIn > (camera.y - blockSize) && yIn < (camera.y + canvas.height + blockSize)){
		return true;
	}
	else{
		return false;
	}
}
*/
//TODO create new function for flying straight to target
/*
function flyTo (obj1, obj2){
	var dx = obj2.xCenter - obj1.x
	var dy = obj2.yCenter - obj1.y
	if (dx != 0 || dy!= 0){
		vx = obj1.speed * (dx / Math.sqrt(dx*dx + dy*dy))
		vy = obj1.speed * (dy / Math.sqrt(dx*dx + dy*dy))

		obj1.x += vx
		obj1.y += vy
	}
}
*/

function goTo (obj1, obj2){
	if (typeof(obj1.path[0])==="object"){
		//distans till målet
		var dx = obj2.x - obj1.x
		var dy = obj2.y - obj1.y
		

		vx = obj1.speed * (dx / Math.sqrt(dx*dx + dy*dy))
		vy = obj1.speed * (dy / Math.sqrt(dx*dx + dy*dy))

		obj1.x += vx
		obj1.y += vy
		/*if (dx != 0 || dy!= 0){
			vx = obj1.speed * (dx / Math.sqrt(dx*dx + dy*dy))
			vy = obj1.speed * (dy / Math.sqrt(dx*dx + dy*dy))

			obj1.x += vx
			obj1.y += vy
		}
		else {
			obj1.path.splice(0, 1);
		}*/
	}
}

