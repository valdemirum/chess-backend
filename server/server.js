const http = require('http'),
      express = require('express'),
      socket = require('socket.io');

const myIo = require('./sockets/io'),
      routes = require('./routes/routes');

const app = express(),
      server = http.Server(app),
      io = socket(server);
require('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up routes under /api
app.use('/', routes);

// Global games object for WebSocket game state
global.games = {};

// Initialize WebSocket logic
myIo(io);

// Start the server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});