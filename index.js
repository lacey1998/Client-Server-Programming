import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle user joining
  socket.on('user:join', (username) => {
    socket.username = username;
    io.emit('chat message', {
      text: `${username} has joined the chat`,
      username: 'System',
      timestamp: new Date().toLocaleTimeString(),
      isSystem: true
    });
  });

  // Handle chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      text: msg,
      username: socket.username || 'Anonymous',
      timestamp: new Date().toLocaleTimeString()
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('chat message', {
        text: `${socket.username} has left the chat`,
        username: 'System',
        timestamp: new Date().toLocaleTimeString(),
        isSystem: true
      });
    }
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
}); 