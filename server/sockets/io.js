module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New socket connection:', socket.id);

    let currentCode = null;

    socket.on('join-game', (data) => {
      currentCode = data.code;
      console.log(`Socket ${socket.id} joining game with code: ${currentCode}, Current games:`, games);
      if (!currentCode) {
        console.warn(`Socket ${socket.id} sent invalid game code`);
        return;
      }
      socket.join(currentCode);
      if (!games[currentCode]) {
        games[currentCode] = true;
        console.log(`Created new game with code: ${currentCode}`);
        return;
      }

      console.log(`Starting game with code: ${currentCode}`);
      io.to(currentCode).emit('start-game');
    });

    socket.on('move', (move) => {
      if (!currentCode) {
        console.warn(`Socket ${socket.id} sent move without joining a game`);
        return;
      }
      console.log(`Move detected in game ${currentCode}:`, move);
      io.to(currentCode).emit('new-move', move);
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected, code: ${currentCode}, Remaining games:`, games);
      if (currentCode) {
        io.to(currentCode).emit('game-over-disconnect');
        delete games[currentCode];
      }
    });
  });
};