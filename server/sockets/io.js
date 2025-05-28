module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New socket connection');

    let currentCode = null;

    socket.on('join-game', (data) => {
      currentCode = data.code;
      socket.join(currentCode);

      if (!games[currentCode]) {
        games[currentCode] = true;
        return;
      }

      io.to(currentCode).emit('start-game');
    });

    socket.on('move', (move) => {
      console.log('move detected');
      io.to(currentCode).emit('new-move', move);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
      if (currentCode) {
        io.to(currentCode).emit('game-over-disconnect');
        delete games[currentCode];
      }
    });
  });
};
