ws = new WebSocket("ws://localhost:8080");
var canvas = document.getElementById('canvas-video');
var context = canvas.getContext('2d');


ws.onmessage = function (data) {
    var img = new Image();
    img.onload = function () {
      context.drawImage(img, 0, 0);
    };
    img.src = URL.createObjectURL(data.data);
}

