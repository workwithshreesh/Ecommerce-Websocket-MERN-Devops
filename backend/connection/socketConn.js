const { express, http, app } = require('../utils/core/express');
const { verifyToken } = require('../middleware/authMiddleware')
const socketIo = require('socket.io');

const server = http.createServer(app);

const io = new socketIo.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.use(async (socket, next) => {
    try {

        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Authentication error"));

        const payload = await verifyToken(token);
        const user = await db.User.findByPk(payload.id);
        if (!user) return next(new Error("User not found"));

        socket.user = user; // Attach user to socket
        next();


    } catch (error) {
        next(new Error("Authentication error"));

    }
});


io.on('connection', socket => {
    console.log(`User connected: ${socket.user.email} (${socket.user.role})`);

    if (socket.user.role === 'delivery') {
        socket.join('delivery-room'); 
    }

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.user.email}`);
    });
});


module.exports = { server, io };

