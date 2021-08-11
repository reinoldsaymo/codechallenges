"use strict";

// https://nodejs.org/api/synopsis.html
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello, World!\n');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });


// https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/
// const https = require('https');
// const fs = require('fs');

// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// };

// https.createServer(options, function(req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
// }).listen(8000);

// https: //html.spec.whatwg.org/multipage/web-sockets.html
//     https: //developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications

var url = 'ws://localhost:5500';

var socket = new WebSocket(url);

socket.onopen = () => socket.send('ping');
socket.onmessage = (event) => addMessage('messages', event.data);
socket.onerror = (event) => console.error("WebSocket error observed:", event);

function addMessage(id, message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    document.getElementById(id).appendChild(messageDiv);
}