import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { AddressInfo } from 'node:net';

interface Room {
    id: string;
    user1: string;
    user2: string;
}

declare module 'socket.io' {
    interface Socket {
        activeRoom?: Room;
    }
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors());

const rooms: Room[] = [];

io.on('connection', (socket) => {
    socket.on('join', async (targetUserId, sourceUserId) => {
        let room = rooms.find((room) => {
            return (room.user1 === targetUserId && room.user2 === sourceUserId) || (room.user1 === sourceUserId && room.user2 === targetUserId);
        });
        if (!room) {
            room = {
                id: Math.random().toString(36).substring(7),
                user1: sourceUserId,
                user2: targetUserId,
            };
            rooms.push(room);
        }
        console.log('User joined room', room.id, 'with', targetUserId, sourceUserId);
        socket.activeRoom = room;
        socket.join(room.id);
    });
    socket.on('message', (message) => {
        if (!socket.activeRoom) {
            console.log('[ERROR] No active room found');
            return;
        }
        console.log('Received message', message);
        message.created_at = new Date();
        io.to(socket.activeRoom.id).emit('message', message);
    });
});

server.listen(process.env.PORT || 3001, async () => {
    try {
        console.log('Listening on port :%s', (server.address() as AddressInfo).port);
    } catch (e) {
        console.error(e);
    }
});
