require('dotenv').config(); // Load environment variables

const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const PORT = process.env.PORT || 3000;

const OWNER_USERNAME = process.env.OWNER_USERNAME;
const OWNER_PASSWORD = process.env.OWNER_PASSWORD;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
    },
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'businessesmedical.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
        req.session.isOwner = true;
        return res.json({ success: true });
    } else {
        return res.json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.get('/check-owner', (req, res) => {
    res.json({ isOwner: !!req.session.isOwner });
});

const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' }
});

let totalViewers = 0;
let totalFollowers = 0;
let activeUsers = [];

io.on('connection', (socket) => {
  totalViewers++;
  io.emit('viewerCountUpdate', totalViewers);

  socket.on('follow', () => {
    totalFollowers++;
    io.emit('followerCountUpdate', totalFollowers);
  });

  socket.on('unfollow', () => {
    if (totalFollowers > 0) totalFollowers--;
    io.emit('followerCountUpdate', totalFollowers);
  });

  socket.on('joinChat', (username) => {
    if (!activeUsers.includes(username)) activeUsers.push(username);
    io.emit('activeChattersUpdate', activeUsers);
  });

  socket.on('leaveChat', (username) => {
    activeUsers = activeUsers.filter(user => user !== username);
    io.emit('activeChattersUpdate', activeUsers);
  });

  socket.on('disconnect', () => {
    totalViewers--;
    io.emit('viewerCountUpdate', totalViewers);
  });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running with Socket.IO at http://localhost:${PORT}`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;

module.exports = server;
