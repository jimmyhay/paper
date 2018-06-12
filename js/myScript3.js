var canvas;
var circles = [];
// The amount of segment points we want to create:
var amount = 20;

// The maximum height of the blob:
var height = 450;
var background;
var size = {};
var newWidth;

// SPRING CONSTANTS
const MASS = 2;
const SPRING = 0.05;
const DAMPING = 0.9;

var springs = [];

var dragging = false;
var selectedSegment;

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

		var distance;

		for (var i=0;i<amount;i++) {
			segment = path.segments[i];
			point = segment.point;

			distance = Math.sqrt(((mousePoint.x-segment.finalRest.x)*(mousePoint.x-segment.finalRest.x))
			+((mousePoint.y-segment.finalRest.y)*(mousePoint.y-segment.finalRest.y)));

			if (distance < 150) {
				segment.spring.rest.x = (Math.cos(segment.finalRest.angle)*distance)+segment.finalRest.x;
				segment.spring.rest.y = (Math.sin(segment.finalRest.angle)*distance)+segment.finalRest.y;
			} else {
				segment.spring.rest.x = segment.finalRest.x;
				segment.spring.rest.y = segment.finalRest.y;
			}
		}

		/*var segment = location.segment;
		var point = segment.point;

		point = path.segments[0].point;
		var point2 = path.segments[1].point;
		var angle = (Math.atan2(point.y - mousePoint.y, mousePoint.x - point.x));

		point2.x = point.x + Math.cos(-angle) * height;
		point2.y = point.y + Math.sin(-angle) * height;*/
});

$(document).ready(function() {
    canvas = document.getElementById('myCanvas');

    resizeCanvas();

	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	size.width = paper.view.size.width*2;
	size.height = paper.view.size.height;
	// Create background color
	background = new paper.Path.Rectangle(new paper.Point(0,0), new paper.Size(paper.view.size.width, paper.view.size.height));
	
	background.fillColor = '#ffc8c8';

	// Create a new path and style it:
	path = new paper.Path({
		// 80% black:
		strokeColor: 'red',
		strokeWidth: 20,
		strokeCap: 'round',
		fillColor: 'red'
	});

	var cx;
	var cy;
	var r = 200;
	var ox = paper.view.size.width/2;
	var oy = paper.view.size.height/2;
	var a = 0;

	for (var i = 0; i < amount; i++) {
		a = ((Math.PI*2)/amount) * i;
		cx = ox + r * Math.cos(a);
		cy = oy + r * Math.sin(a);

		segment = path.add(new paper.Point(cx, cy));

		segment.finalRest = {};
		segment.finalRest.x = segment.point.x;
		segment.finalRest.y = segment.point.y;
		segment.finalRest.angle = a;

		tSpring = new Spring(new paper.Point(0,0),0,0,segment.point, new paper.Point(segment.point.x, segment.point.y));
		springs.push(tSpring);

		segment.spring = tSpring;
	}

	path.closed = true;
	//path.selected = true;
	path.smooth();

	var segment;
	var tSpring;

	paper.view.onMouseDown = function(event) {
		//dragging = false;

		var mousePoint = new paper.Point(event.point.x, event.point.y);
		var location = path.getNearestLocation(mousePoint);
		var segment = location.segment;
		var point = segment.point;

		selectedSegment = segment;

		dragging = true;

	    //point.set(event.point.x, event.point.y);
	    segment.spring.rest.x = mousePoint.x;
	    segment.spring.rest.y = mousePoint.y;
	}

	paper.view.onMouseUp = function(event) {
		selectedSegment.spring.rest.x = selectedSegment.finalRest.x;
		selectedSegment.spring.rest.y = selectedSegment.finalRest.y;
	}

	paper.view.onFrame = function (event) {
		var curSpring;
		var curPoint;

		for (var i=0; i < springs.length; i++) {
			curSpring = springs[i];
			curPoint = curSpring.point;

			// DO THE SPRING CALCULATIONS INIT BRUV
			curSpring.force = -SPRING*(curPoint.x-curSpring.rest.x);
			curSpring.accel = curSpring.force/MASS;
			curSpring.vel.x = DAMPING*(curSpring.vel.x+curSpring.accel);
			curPoint.x = curPoint.x+curSpring.vel.x;

			curSpring.force = -SPRING*(curPoint.y-curSpring.rest.y);
			curSpring.accel = curSpring.force/MASS;
			curSpring.vel.y = DAMPING*(curSpring.vel.y+curSpring.accel);
			curPoint.y = curPoint.y+curSpring.vel.y;
		}

		//path.smooth();
	}
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