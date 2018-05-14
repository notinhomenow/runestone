const WebSocketServer = require("ws").Server;
const cam = require("../build/Release/camera.node");
const fs = require("fs");
const websocketPort = 8080,
    webPort = 9999,
    width = 640,
    height = 360;

var wss = new WebSocketServer({
    port: websocketPort
});

var clients = {};

var frameCallback = function (image) {
    var frame = {
        type: "frame",
        frame: new Buffer(image, "ascii").toString("base64")
    };
    var raw = JSON.stringify(frame);
    for (var index in clients) {
        clients[index].send(raw);
    }
};

var disconnectClient = function (index) {
    delete clients[index];
    if (Object.keys(clients).length == 0) {
        console.log("No Clients, Closing Camera");
        cam.Close();
    }
};

const connectClient = (ws) => {
    const index = "" + Date.now();
    if (!cam.IsOpen()) {
        console.log("New Clients, Opening Camera");
        cam.Open(frameCallback, {
            width: width,
            height: height,
            window: false,
            codec: ".jpg",
            input: inputString
        });
    }
    clients[index] = ws;
    return index;
}

wss.on('connection', function (ws) {
    var disconnected = false;
    const index = connectClient(ws);

    ws.on('close', function () {
        disconnectClient(index);
    });

    ws.on('open', function () {
        console.log("Opened");
    });

    ws.on('message', function (message) {

        switch (message) {
        case "close":
            {
                disconnectClient(index);
            }
            break;
        case "size":
            {
                var size = cam.GetPreviewSize();

                ws.send(JSON.stringify({
                    type: "size",
                    width: size.width,
                    height: size.height
                }));
            }
            break;
        }
    });

});

