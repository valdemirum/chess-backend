// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');
// require('dotenv').config();

// const routes = require('./routes/routes');
// const myIo = require('./sockets/io');

// const app = express();
// const server = http.createServer(app);

// const FRONTEND_URL = "https://chessgame-85747.vercel.app"; // Replace with your actual frontend domain

// // Apply middleware
// app.use(express.json());
// app.use(cors({
//   origin: FRONTEND_URL,
//   methods: ['GET', 'POST'],
//   credentials: true,
// }));

// // API routes
// app.use('/', routes);

// // Global state
// global.games = {};

// // Set up Socket.IO with CORS
// const io = new Server(server, {
//   cors: {
//     origin: FRONTEND_URL,
//     methods: ['GET', 'POST'],
//     credentials: true,
//   }
// });

// // WebSocket setup
// myIo(io);

// // Listen on Render's assigned port
// const PORT = process.env.PORT || 10000;
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
const http = require('http');
const path = require('path');
const express = require('express');
const socket = require('socket.io');
// const handlebars = require('express-handlebars'); // Uncomment only if using HTML rendering

const myIo = require('./sockets/io');
const routes = require('./routes/routes');

const app = express();
const server = http.Server(app);
const io = socket(server);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// If you serve static files (optional)
// app.use('/public', express.static(path.join(__dirname, '..', 'front', 'public')));

// Uncomment below only if you're rendering HTML views
/*
const Handlebars = handlebars.create({
  extname: '.html',
  partialsDir: path.join(__dirname, '..', 'front', 'views', 'partials'),
  defaultLayout: false,
  helpers: {}
});
app.engine('html', Handlebars.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'front', 'views'));
*/

// Attach routes at the root path
routes(app); // Ensure this file defines routes directly at '/'

// Global state
global.games = {};

// Socket.io integration
myIo(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
