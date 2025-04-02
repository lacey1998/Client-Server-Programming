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

// Store connected users
const users = new Map();

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Handle user joining
  socket.on('user:join', (username) => {
    users.set(socket.id, username);
    io.emit('user:list', Array.from(users.values()));
    io.emit('chat message', {
      text: `${username} has joined the chat`,
      username: 'System',
      timestamp: new Date().toLocaleTimeString(),
      isSystem: true
    });
  });
  
  // Handle chat messages
  socket.on('chat message', (msg) => {
    const username = users.get(socket.id) || 'Anonymous';
    const timestamp = new Date().toLocaleTimeString();
    io.emit('chat message', {
      text: msg,
      username,
      timestamp,
      id: socket.id
    });
  });
  
  // Handle typing status
  socket.on('typing:start', () => {
    const username = users.get(socket.id) || 'Anonymous';
    socket.broadcast.emit('typing:status', `${username} is typing...`);
  });

  socket.on('typing:stop', () => {
    socket.broadcast.emit('typing:status', '');
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    if (username) {
      users.delete(socket.id);
      io.emit('user:list', Array.from(users.values()));
      io.emit('chat message', {
        text: `${username} has left the chat`,
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