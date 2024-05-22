WebSocket Server (Node.js)
First, you need to set up a Node.js environment. Ensure you have Node.js installed on your system. Then, create a new directory for your project and initialize a new Node.js project:

bash
mkdir websocket-example
cd websocket-example
npm init -y

Next, install the ws package, which is a WebSocket library for Node.js:

bash
npm install ws

save server.js

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



Running the WebSocket Server

To start the WebSocket server, run the following command in your project directory:
node server.js
USE HTML ADDED IN GIT
