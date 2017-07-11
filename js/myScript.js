//var myCircle = new Path.Circle(new Point(100, 70), 10);
//myCircle.fillColor = '#76D9FF';
/*var mySquare = new Path.Rectangle(new Point(200, 70), 60);
mySquare.fillColor = '#ff0000';
var myTriangle = new Path.RegularPolygon(new Point(150, 100), 3, 40);
myTriangle.fillColor = '#00BA1C';*/

//var canvas = document.getElementById('canvas'), 
//context = canvas.getContext('2d');
var canvas;
var circles = [];

$(document).mousemove(function(event) {
	console.log("EH");
	//myCircle.x = mouseX;
	//myCircle.y = mouseY;
	//myCircle.position = event.point;
	var circle = new paper.Path.Circle(new paper.Point(event.pageX, event.pageY), 30);
	
	circle.fillColor = '#76D9FF';

	circles.push(circle);

	if (circles.length > 100) {
		circle = circles.splice(0,1);
		circle[0].remove();
	}

	//myCircle.exclude(mySquare);
});

$( document ).ready(function() {
    console.log( "ready!" );

    canvas = document.getElementById('myCanvas');

    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;

	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	// Create a Paper.js Path to draw a line into it:
	var path = new paper.Path();
});