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

// === Initializations ===
let totalViewers = 0;
let totalFollowers = 0;
let activeUsers = []; // <- for Active Chatters List

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

// === Socket.IO Events ===
io.on('connection', (socket) => {
    console.log('A user connected');
    totalViewers++;
    io.emit('viewerCountUpdate', totalViewers);
    socket.emit('followerCountUpdate', totalFollowers);

    let currentUser = `Guest${Math.floor(Math.random() * 10000)}`; // Default username
    socket.username = currentUser; // Attach default username to the socket

    socket.on('joinChat', ({ username, deviceInfo }) => {
        currentUser = username || currentUser;
        socket.username = `${currentUser} (${deviceInfo})`; 
        if (!activeUsers.includes(socket.username)) {
            activeUsers.push(socket.username);
            io.emit('activeChattersUpdate', activeUsers);
        }
    });
    
    

    socket.on('leaveChat', (username) => {
        activeUsers = activeUsers.filter(user => user !== username);
        io.emit('activeChattersUpdate', activeUsers);
    });

    // --- Follow/Unfollow Management ---
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

    socket.on('sendMessage', ({ text, messageId }) => {
        io.emit('newMessage', { text, sender: socket.username || 'Someone', messageId });
    });
    

    socket.on('sendReply', ({ replyText, messageId }) => {
        io.emit('newReply', { replyText, sender: socket.username || 'Someone', messageId });
    });
    
    

    socket.on('updateMessage', ({ newText, messageId }) => {
        io.emit('updateMessage', { newText, messageId });
        console.log(`[Edit] Message ${messageId} updated to: ${newText}`);
    });

    // --- Disconnect Event ---
    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.username}`);
        totalViewers--;
        io.emit('viewerCountUpdate', totalViewers);

        activeUsers = activeUsers.filter(user => user !== socket.username);
        io.emit('activeChattersUpdate', activeUsers);
    });
});

// === Start the Server ===
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running with Socket.IO at http://localhost:${PORT}`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
