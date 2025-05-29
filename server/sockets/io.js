module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New socket connection:', socket.id);

    let currentCode = null;
    let disconnectTimeout = null;

    socket.on('join-game', (data) => {
      currentCode = data.code;
      console.log(`Socket ${socket.id} joining game with code: ${currentCode}, Current games:`, games);
      if (!currentCode) {
        console.warn(`Socket ${socket.id} sent invalid game code`);
        return;
      }
      socket.join(currentCode);
      if (!games[currentCode]) {
        games[currentCode] = { active: true, players: [socket.id] };
        console.log(`Created new game with code: ${currentCode}`);
        return;
      }

      games[currentCode].players.push(socket.id);
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
      if (currentCode && games[currentCode]) {
        // Remove player from game
        games[currentCode].players = games[currentCode].players.filter(id => id !== socket.id);
        
        // If no players remain, end the game immediately
        if (games[currentCode].players.length === 0) {
          console.log(`No players left in game ${currentCode}, ending game`);
          io.to(currentCode).emit('game-over-disconnect');
          delete games[currentCode];
          return;
        }

        // Set a timeout to end the game if the player doesn't reconnect
        disconnectTimeout = setTimeout(() => {
          if (currentCode && games[currentCode]) {
            console.log(`Disconnect timeout expired for game ${currentCode}, ending game`);
            io.to(currentCode).emit('game-over-disconnect');
            delete games[currentCode];
          }
        }, 10000); // 10-second grace period
      }
    });

    socket.on('reconnect', () => {
      console.log(`Socket ${socket.id} reconnected, code: ${currentCode}`);
      if (disconnectTimeout) {
        clearTimeout(disconnectTimeout);
        disconnectTimeout = null;
        console.log(`Reconnection successful, cleared disconnect timeout for game ${currentCode}`);
      }
    });
  });
};