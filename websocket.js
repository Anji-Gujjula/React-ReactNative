// websocket-server/server.js
const io = require('socket.io')(4000, {
  cors: {
    origin: "http://localhost:3000", // Allow connection from React app
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('file-upload', (file) => {
    console.log('Received file:', file.name);
    // Broadcast file to all connected clients (including React Native app)
    io.emit('file-saved', file);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
