const cv = require('opencv');
const WebSocket = require('ws');
const fps = 40;
const camInterval = 1000 / fps;


const wss = new WebSocket.Server({
    port: 8080,
});

wss.on('connection', function (ws) {
    console.log("connection");

    try {
        var camera = new cv.VideoCapture(0);
        setInterval(() => {
            camera.read((err, data) => {
                if (err) throw err;
                const raw = data.toBuffer()
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                      client.send(raw);
                    }
                });
            })
        }, camInterval);
      } catch (e){
        console.log("Couldn't start camera:", e)
    }

})


