const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  const sessionId = socket.handshake.query.sessionId;
  socket.join(sessionId);
  console.log('User connected: ' + socket.id + ' to session: ' + sessionId);

  socket.on('clipboard', (data) => {
    socket.to(sessionId).emit('clipboard', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});
