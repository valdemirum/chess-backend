const http = require('http'),
      express = require('express'),
      socket = require('socket.io');

const myIo = require('./sockets/io'),
      routes = require('./routes/routes');

const cors = require('cors');

const app = express(),
      server = http.Server(app),
      io = socket(server);

server.listen(process.env.PORT);

global.games = {};

myIo(io);

app.use(cors({
    origin: 'https://chessgame-85747.vercel.app', // Replace with your frontend's domain
    methods: ['GET', 'POST'],
}));

console.log(`Server listening on port ${process.env.PORT}`);

routes(app);