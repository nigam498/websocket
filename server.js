const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    // Send a welcome message to the client
    ws.send('Welcome to the WebSocket server!');

    // Handle messages received from the client
    ws.on('message', function incoming(message) {
        console.log('Received message from client:', message);

        // Echo the message back to the client
        ws.send(`Server received: ${message}`);
    });

    // Handle connection close
    ws.on('close', function () {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
