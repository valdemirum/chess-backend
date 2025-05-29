const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const routes = require('./routes/routes');
const myIo = require('./sockets/io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['https://your-frontend-domain.com', 'http://localhost:3000'], // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global game state
global.games = {};

// Register socket handlers
myIo(io);

// Register routes
routes(app);

// Default root
app.get('/', (req, res) => {
  res.json({ message: 'Chess API running' });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Socket.IO version:', socketIo.version);
});