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

HTML FILE-:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Client</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #connectionForm {
            margin-bottom: 20px;
        }
        #messages {
            border: 1px solid #ccc;
            padding: 10px;
            height: 200px;
            overflow-y: scroll;
        }
    </style>
</head>
<body>
    <h1>WebSocket Client</h1>
    <form id="connectionForm">
        <label for="ipAddress">IP Address:</label>
        <input type="text" id="ipAddress" placeholder="127.0.0.1">
        <label for="port">Port:</label>
        <input type="text" id="port" placeholder="8080">
        <button type="button" id="connectButton">Connect</button>
    </form>
    <button id="sendMessage" disabled>Send Message</button>
    <div id="messages"></div>

    <script>
        let socket;

        document.getElementById('connectButton').addEventListener('click', function () {
            const ipAddress = document.getElementById('ipAddress').value;
            const port = document.getElementById('port').value;

            if (!ipAddress || !port) {
                alert('Please enter a valid IP address and port');
                return;
            }

            const url = `ws://${ipAddress}:${port}`;
            socket = new WebSocket(url);

            // Event listener for when the connection is open
            socket.addEventListener('open', function (event) {
                console.log('Connected to the WebSocket server');
                document.getElementById('messages').innerHTML += '<p>Connected to the WebSocket server</p>';
                document.getElementById('sendMessage').disabled = false;
            });

            // Event listener for receiving messages
            socket.addEventListener('message', function (event) {
                console.log('Message from server:', event.data);
                document.getElementById('messages').innerHTML += `<p>Server: ${event.data}</p>`;
            });

            // Event listener for when the connection is closed
            socket.addEventListener('close', function (event) {
                console.log('WebSocket connection closed');
                document.getElementById('messages').innerHTML += '<p>WebSocket connection closed</p>';
                document.getElementById('sendMessage').disabled = true;
            });

            // Event listener for errors
            socket.addEventListener('error', function (event) {
                console.error('WebSocket error:', event);
                document.getElementById('messages').innerHTML += '<p>Error occurred. Please check the console for details.</p>';
            });
        });

        document.getElementById('sendMessage').addEventListener('click', function () {
            const message = 'Hello Server!';
            console.log('Sending message to server:', message);
            socket.send(message);
        });
    </script>
</body>
</html>


Running the WebSocket Server

To start the WebSocket server, run the following command in your project directory:
node server.js
