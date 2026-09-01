const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('join-room', (room, username) => {
        socket.join(room);
        socket.to(room).emit('user-connected', { userId: socket.id, username });

        socket.on('offer', data => io.to(data.target).emit('offer', { offer: data.offer, sender: socket.id, username }));
        socket.on('answer', data => io.to(data.target).emit('answer', { answer: data.answer, sender: socket.id }));
        socket.on('ice-candidate', data => io.to(data.target).emit('ice-candidate', { candidate: data.candidate, sender: socket.id }));

        socket.on('disconnect', () => {
            socket.to(room).emit('user-disconnected', { userId: socket.id });
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));