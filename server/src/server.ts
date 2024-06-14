require('dotenv').config();
import connectDB from './config/db';
import app from './app';
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);

const jwt = require('jsonwebtoken');
import { Socket } from 'socket.io';
import { NextFunction } from 'express';
import Document from './schema/document.schema';

const port = process.env.PORT;

interface CustomSocket extends Socket {
    user?: any;
}

const io = socketIo(server, {
    cors: {
        origin: 'http://127.0.0.1:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.use((socket: CustomSocket, next: NextFunction) => {
    const token = socket.handshake.auth.token;
    if (token) {
        if (token) {
            jwt.verify(token, process.env.JWTSECRET as string, (err: Error | null, user: any | undefined) => {
                if (err) {
                    return next(new Error('Authentication error'));
                }
                socket.user = user;
                next();
            });
        } else {
            next(new Error('Authentication error'));
        }
    }
});

io.on('connection', (socket: CustomSocket) => {
    console.log(`User connected: ${socket.user.userId}`);

    socket.on('joinDocument', (documentId) => {
        socket.join(documentId);
    });

    socket.on('editDocument', async (documentId, content) => {
        const document = await Document.findByIdAndUpdate(
            documentId,
            { content, lastModified: Date.now() },
            { new: true }
        );
        if (document) {
            socket.to(documentId).emit('documentUpdated', document);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.user.userId}`);
    });
});

server.listen(port, () => {
    try {
        console.log(`Server is listening on http://localhost:${port}`);
        connectDB();
    } catch (err: any) {
        console.log(err.message);
    }
});
