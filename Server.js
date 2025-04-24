require('dotenv').config();
const path = require('path');
const fs = require('fs');
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
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

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

const followersFile = path.join(__dirname, 'followers.json');
if (fs.existsSync(followersFile)) {
    try {
        const data = fs.readFileSync(followersFile);
        totalFollowers = JSON.parse(data).count || 0;
    } catch (error) {
        console.error('Error reading followers file:', error);
    }
}

function saveFollowerCount() {
    try {
        fs.writeFileSync(followersFile, JSON.stringify({ count: totalFollowers }));
    } catch (error) {
        console.error('Error writing followers file:', error);
    }
}

io.on('connection', (socket) => {
    totalViewers++;
    io.emit('viewerCountUpdate', totalViewers);
    socket.emit('followerCountUpdate', totalFollowers);

    // Handle follow/unfollow events
    socket.on('follow', () => {
        totalFollowers++;
        saveFollowerCount();
        io.emit('followerCountUpdate', totalFollowers);
    });

    socket.on('unfollow', () => {
        if (totalFollowers > 0) totalFollowers--;
        saveFollowerCount();
        io.emit('followerCountUpdate', totalFollowers);
    });

    // Handle chat join/leave
    socket.on('joinChat', (username) => {
        if (!activeUsers.includes(username)) activeUsers.push(username);
        io.emit('activeChattersUpdate', activeUsers);
    });

    socket.on('leaveChat', (username) => {
        activeUsers = activeUsers.filter(user => user !== username);
        io.emit('activeChattersUpdate', activeUsers);
    });

    // Handle new message
    socket.on('sendMessage', ({ sender, text }) => {
        const id = Date.now().toString();  // Unique ID for the message
        io.emit('newMessage', { id, sender, text });
    });

    // Handle reply messages
    socket.on('sendReply', ({ sender, text, parentId }) => {
        const id = Date.now().toString();  // Unique ID for the reply
        io.emit('newReply', { id, sender, text, parentId });
    });

    // Handle message edits
    socket.on('editMessage', ({ id, newText }) => {
        io.emit('messageEdited', { id, newText });
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
