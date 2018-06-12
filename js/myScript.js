var canvas;
var circles = [];
// The amount of segment points we want to create:
var amount = 20;

// The maximum height of the wave:
var height = 60;
var background;
var size = {};
var newWidth;

// SPRING CONSTANTS
const MASS = 0.8;
const SPRING = 0.1;
const DAMPING = 0.95;

var springs = [];

var Spring = function(velocity, accel, force, point, rest) {
	this.vel = velocity;
	this.accel = accel;
	this.force = force;
	this.rest = rest;
	this.point = point;
};

$(document).mousemove(function(event) {
	var mousePoint = new paper.Point(event.pageX, event.pageY);
	var location = path.getNearestLocation(mousePoint);
	var segment = location.segment;
	var point = segment.point;

	if (location.distance < 10) {
		var y = mousePoint.y;
		//point.y += (y - point.y) / 6;
		segment.spring.rest = y;


		if (segment.previous) {
			var previous = segment.previous.point;
			previous.y += (y - previous.y) / 24;
		}
		if (segment.next) {
			var next = segment.next.point;
			next.y += (y - next.y) / 24;
		}
	}

	path.smooth();
});

$(document).ready(function() {
    canvas = document.getElementById('myCanvas');

    resizeCanvas();

	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	size.width = paper.view.size.width * 2;
	size.height = paper.view.size.height;
	// Create background color
	background = new paper.Path.Rectangle(new paper.Point(0,0), new paper.Size(paper.view.size.width, paper.view.size.height));
	
	background.fillColor = '#ffc8c8';

	// Create a new path and style it:
	path = new paper.Path({
		// 80% black:
		strokeColor: 'yellow',
		fillColor: 'yellow',
		strokeWidth: 20,
		strokeCap: 'round'
	});

	var segment;
	var tSpring;
	// Add 5 segment points to the path spread out
	// over the width of the view:

	//newWidth = paper.view.size.width + ((paper.view.size.width/(amount)) * 2);
	newWidth = paper.view.size.width;

	for (var i = 0; i <= amount; i++) {
		segment = path.add(new paper.Point((i-1) * (newWidth/amount), paper.view.size.height/2));

		//if (i == 0 || i == amount) {
		//	segment.point.y = paper.view.size.height;
		//} else {
			tSpring = new Spring(0,0,0,segment.point, segment.point.y);
			springs.push(tSpring);

			segment.spring = tSpring;
		//}
		//if (i == 1) segment.point.x =
	}

	path.selected = true;

	path.onMouseEnter = function(event) {
    	//this.strokeColor = 'green';
	}

	path.onMouseLeave = function(event) {
    	//this.strokeColor = 'yellow';
	}

	paper.view.onFrame = function (event) {
		var curSpring;
		var curPoint;

		for (var i=0; i < springs.length; i++) {
			curSpring = springs[i];
			curPoint = curSpring.point;

			// DO THE SPRING CALCULATIONS INIT BRUV
			curSpring.force = SPRING*(curPoint.y-curSpring.rest);
			curSpring.accel = curSpring.force/MASS;
			curSpring.vel = DAMPING*(curSpring.vel+curSpring.accel);
			curPoint.y = curPoint.y-curSpring.vel;
		}



		//console.log(path.segments.length);
		// Loop through the segments of the path:
		/*for (var i = 1; i < amount; i++) {
			var segment = path.segments[i];

			// A cylic value between -1 and 1
			var sinus = Math.sin(event.time + i);
			
			// Change the y position of the segment point:
			segment.point.y = sinus * height + paper.view.size.height/2;
		}
		// Uncomment the following line and run the script again
		// to smooth the path:
		path.smooth();*/
	}

	//paper.view.fillStyle = "blue";
	//paper.view.fillRect(0, 0, canvas.width, canvas.height);
});

$(window).resize(function() {
	canvas.width = window.innerWidth; //document.width is obsolete
    canvas.height = window.innerHeight; //document.height is obsolete

	path.remove();
	background.remove();

	background = new paper.Path.Rectangle(new paper.Point(0,0), new paper.Size(paper.view.size.width, paper.view.size.height));
	
	background.fillColor = '#000000';

	// Create a new path and style it:
	path = new paper.Path({
		// 80% black:
		strokeColor: 'red',
		strokeWidth: 10,
		strokeCap: 'round'
	});

	var segment;

	// Add 5 segment points to the path spread out
	// over the width of the view:
	for (var i = 0; i <= amount; i++) {
		segment = path.add(new paper.Point(i * (paper.view.size.width/amount), paper.view.size.height/2));
		if (i == 0 || i == amount) segment.point.y = paper.view.size.height;
	}

	path.selected = true;

	//if (background) 
});

function resizeCanvas() {
	canvas.width = window.innerWidth; //document.width is obsolete
    canvas.height = window.innerHeight; //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;
};