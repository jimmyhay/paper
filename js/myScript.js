//var myCircle = new Path.Circle(new Point(100, 70), 10);
//myCircle.fillColor = '#76D9FF';
/*var mySquare = new Path.Rectangle(new Point(200, 70), 60);
mySquare.fillColor = '#ff0000';
var myTriangle = new Path.RegularPolygon(new Point(150, 100), 3, 40);
myTriangle.fillColor = '#00BA1C';*/

//var canvas = document.getElementById('canvas'), 
//context = canvas.getContext('2d');

var circles = [];

function onMouseMove(event) {
	//console.log("EH");
	//myCircle.x = mouseX;
	//myCircle.y = mouseY;
	//myCircle.position = event.point;
	var circle = new Path.Circle(new Point(event.point.x, event.point.y), 30);
	
	circle.fillColor = '#76D9FF';

	circles.push(circle);

	if (circles.length > 100) {
		circle = circles.splice(0,1);
		circle[0].remove();
	}

	//myCircle.exclude(mySquare);
}

function onMouseDrag(event) {
	//var radius = event.delta.length*10;
	//var circle = new Path.Circle(event.middlePoint, radius);
	//circle.fillColor = '#76D9FF';
}