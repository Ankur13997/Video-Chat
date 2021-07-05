const express = require('express');
const app = express();

// creating server
const http = require('http');
const server = http.Server(app)

// Importing socket.io npm package
const io = require('socket.io')(server);
const stream = require('./ws/stream');
const path = require('path');


// set statics folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});

// Run when client connects
io.of('/stream').on('connection', stream , function() {
    console.log("New WS conenction...")
});

// to deploy and run on local server
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
server.listen(port, host, function(){
    console.log('Server running on port '+ port);
});