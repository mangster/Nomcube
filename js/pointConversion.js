function worldDistanceToScreenDistance(distance) {
    //TODO riktig fullösning, gör om gör bättre
	var start ={"x": 0, "y": 0};
    var end ={"x": distance, "y": 0};
    start = worldToScreen(start);
    end = worldToScreen(end);
    var side1 = start.x - end.x;
    var side2 = start.y - end.y;
    var result = Math.sqrt(side1 * side1 + side2 * side2);
    return result;
}

function worldToScreen(point) {
	var rX = (point.x - point.y);
	var rY = (point.x + point.y) / 2;

	return { "x": Math.round(rX), "y": Math.round(rY) };
}

function screenToWorld(point) {
	//rX = (point.y + point.x);
	//rY = (point.x - point.y)/2;	
	rY = ((point.y * 2) - point.x)/2;
	rX = point.x + rY;
	return { "x": Math.round(rX), "y": Math.round(rY) };
}

function gridToWorld(Cell, offset) {

	var rX = Cell.x * cellWidth + offset.offsetX;
	var rY = Cell.y * cellHeight - offset.offsetY;

	return { "x": Math.floor(rX), "y": Math.floor(rY) };
}

function worldToGrid(point){
	var rX = point.x / cellWidth;
	var rY = point.y / cellHeight;
	return { "x": Math.round(rX), "y": Math.round(rY) };
}

function getWorldSquareBoundaries(theCellX, theCellY) {
	//bottom right
	var aOffset = { "offsetX": (cellWidth * -1) / 2, "offsetY": (cellHeight * -1) / 2 };
	var aCell = { "x": theCellX, "y": theCellY };
	var p1 = gridToWorld(aCell, aOffset);
	
	//bottom left
	aOffset = { "offsetX": (cellWidth) / 2, "offsetY": (cellHeight * -1) / 2 };
	//var p2 = getScreenCoords(aCell, aOffset);
	var p2 = gridToWorld(aCell, aOffset);
	

	//top left
	aOffset = { "offsetX": (cellWidth) / 2, "offsetY": (cellHeight) / 2 };
	//var p3 = getScreenCoords(aCell, aOffset);
	var p3 = gridToWorld(aCell, aOffset);

	//top right
	aOffset = { "offsetX": (cellWidth * -1) / 2, "offsetY": (cellHeight) / 2 };
	//var p4 = getScreenCoords(aCell, aOffset);
	var p4 = gridToWorld(aCell, aOffset);
	
	//center
	aOffset = { "offsetX": 0, "offsetY": 0 };
	var center = gridToWorld(aCell, aOffset);

	return { "point1": p1, "point2": p2, "point3": p3, "point4": p4, "center": center };
}

function getSquareCorners(theCellX, theCellY, width) {
	//bottom right
	var aOffset = { "offsetX": (width * -1) / 2, "offsetY": (width * -1) / 2 };
	var aCell = { "x": theCellX, "y": theCellY };
	var p1 = gridToWorld(aCell, aOffset);
	
	//bottom left
	aOffset = { "offsetX": (width) / 2, "offsetY": (width * -1) / 2 };
	//var p2 = getScreenCoords(aCell, aOffset);
	var p2 = gridToWorld(aCell, aOffset);
	

	//top left
	aOffset = { "offsetX": (width) / 2, "offsetY": (width) / 2 };
	//var p3 = getScreenCoords(aCell, aOffset);
	var p3 = gridToWorld(aCell, aOffset);

	//top right
	aOffset = { "offsetX": (width * -1) / 2, "offsetY": (width) / 2 };
	//var p4 = getScreenCoords(aCell, aOffset);
	var p4 = gridToWorld(aCell, aOffset);
	
	//center
	aOffset = { "offsetX": 0, "offsetY": 0 };
	var center = gridToWorld(aCell, aOffset);

	return { "point1": p1, "point2": p2, "point3": p3, "point4": p4, "center": center };
}