ws = new WebSocket("ws://localhost:8080");
var canvas = document.getElementById('canvas-video');
var context = canvas.getContext('2d');
var map = document.getElementById('canvas-map');
var mapContext = map.getContext('2d');

var dropoffPoints = [
  {
    x: 1,
    y: 0,
    name: "Point 1"
  },
  {
    x: 2.5,
    y: 0,
    name: "Point 2"
  },
  {
    x: 4,
    y: 0,
    name: "Point 3"
  },
  {
    x: 0.2,
    y: 2.5,
    name: "Point 4"
  },
  {
    x: 4.8,
    y: 2.5,
    name: "Point 5"
  }
]

function drawDropoffPoints(dropoffPoints) {

  mapContext.fillStyle = "red";
  for (var i = 0; i < dropoffPoints.length; i++) {
    const dp = dropoffPoints[i];
    mapContext.beginPath();
    mapContext.arc(100*dp.x, 100*dp.y + 10, 10,0,2*Math.PI);
    mapContext.fill();
  }
}

function drawInitialMap() {

  mapContext.fillStyle = "#000000";
  mapContext.fillRect(250,460,20,20);
  drawDropoffPoints(dropoffPoints);
}

drawInitialMap();

function updateMap(dropoffPoint, light ) {



}

ws.onmessage = function (data) {
    var img = new Image();
    img.onload = function () {
      context.drawImage(img, 0, 0);
    };
    img.src = URL.createObjectURL(data.data);
}

