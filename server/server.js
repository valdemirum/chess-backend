const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/routes');
const myIo = require('./sockets/io');

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = "https://chessgame-85747.vercel.app/"; // Replace with your actual frontend domain

// Apply middleware
app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true,
}));

// API routes
app.use('/', routes);

// Global state
global.games = {};

// Set up Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// WebSocket setup
myIo(io);

// Listen on Render's assigned port
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
