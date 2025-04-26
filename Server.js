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
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3000;
const OWNER_USERNAME = process.env.OWNER_USERNAME;
const OWNER_PASSWORD = process.env.OWNER_PASSWORD;

// --- Middleware ---
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

// --- Routes ---
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
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

app.get('/check-owner', (req, res) => {
    res.json({ isOwner: !!req.session.isOwner });
});

// --- Files ---
const followersFile = path.join(__dirname, 'followers.json');
const messagesFile = path.join(__dirname, 'messages.json');

// --- Data ---
let totalViewers = 0;
let totalFollowers = 0;
let activeUsers = []; // [{ username, deviceInfo }]
let messages = [];    // [{ text, sender, messageId, timestamp, replies: [] }]
const MAX_MESSAGES = 100; // 👈 Only keep last 100 messages

// --- Load Existing Data ---
if (fs.existsSync(followersFile)) {
    try {
        const data = fs.readFileSync(followersFile, 'utf8');
        totalFollowers = JSON.parse(data).count || 0;
    } catch (err) {
        console.error('Error reading followers file:', err);
    }
}

if (fs.existsSync(messagesFile)) {
    try {
        const data = fs.readFileSync(messagesFile, 'utf8');
        messages = JSON.parse(data) || [];
    } catch (err) {
        console.error('Error reading messages file:', err);
    }
}

// --- Save Functions ---
function saveFollowerCount() {
    try {
        fs.writeFileSync(followersFile, JSON.stringify({ count: totalFollowers }));
    } catch (err) {
        console.error('Error saving followers file:', err);
    }
}

function saveMessages() {
    try {
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    } catch (err) {
        console.error('Error saving messages file:', err);
    }
}

// --- Socket.IO Events ---
io.on('connection', (socket) => {
    console.log('A user connected');
    totalViewers++;
    io.emit('viewerCountUpdate', totalViewers);
    socket.emit('followerCountUpdate', totalFollowers);

    let currentUser = `Guest${Math.floor(Math.random() * 10000)}`;
    let currentDevice = "Unknown Device";
    socket.username = currentUser;

    // Handle joining chat
    socket.on('joinChat', ({ username, deviceInfo }) => {
        currentUser = username || currentUser;
        currentDevice = deviceInfo || "Unknown Device";

        socket.username = currentUser;
        socket.deviceInfo = currentDevice;

        if (!activeUsers.find(u => u.username === currentUser)) {
            activeUsers.push({ username: currentUser, deviceInfo: currentDevice });
            io.emit('activeChattersUpdate', activeUsers);
        }

        // Send all existing messages to this user
        socket.emit('loadMessages', messages);
    });

    // Handle leaving chat
    socket.on('leaveChat', (username) => {
        activeUsers = activeUsers.filter(user => user.username !== username);
        io.emit('activeChattersUpdate', activeUsers);
    });

    // Handle follow / unfollow
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

    // Handle sending message
    socket.on('sendMessage', ({ text, messageId, timestamp }) => {
        const newMessage = {
            text,
            sender: socket.username || 'Someone',
            messageId,
            timestamp: timestamp || Date.now(),
            replies: []
        };

        messages.push(newMessage);

        // 🔥 Auto-limit messages
        if (messages.length > MAX_MESSAGES) {
            messages = messages.slice(-MAX_MESSAGES); // Keep only last 100
        }

        saveMessages();
        io.emit('newMessage', newMessage);
    });

    // Handle sending reply
    socket.on('sendReply', ({ replyText, messageId, timestamp }) => {
        const parentMessage = messages.find(m => m.messageId === messageId);
        if (parentMessage) {
            const reply = {
                replyText,
                sender: socket.username || 'Someone',
                messageId,
                timestamp: timestamp || Date.now()
            };
            parentMessage.replies.push(reply);
            saveMessages();
            io.emit('newReply', { ...reply, messageId });
        }
    });

    // Handle editing message
    socket.on('updateMessage', ({ newText, messageId }) => {
        const message = messages.find(m => m.messageId === messageId);
        if (message) {
            message.text = newText;
            saveMessages();
            io.emit('updateMessage', { newText, messageId });
            console.log(`[Edit] Message ${messageId} updated.`);
        }
    });

    // 🧹 Handle deleting message (only if user is OWNER)
    socket.on('deleteMessage', ({ messageId, isOwner }) => {
        if (isOwner) { // double security on frontend too
            messages = messages.filter(m => m.messageId !== messageId);
            saveMessages();
            io.emit('deleteMessage', { messageId });
            console.log(`[Delete] Message ${messageId} deleted by owner.`);
        }
    });

    // ✍ Typing indicator
    socket.on('typing', ({ username }) => {
        socket.broadcast.emit('typing', { username });
    });

    socket.on('stopTyping', ({ username }) => {
        socket.broadcast.emit('stopTyping', { username });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.username}`);
        totalViewers--;
        io.emit('viewerCountUpdate', totalViewers);

        activeUsers = activeUsers.filter(user => user.username !== socket.username);
        io.emit('activeChattersUpdate', activeUsers);
    });
});

// --- Start Server ---
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running with Socket.IO at http://localhost:${PORT}`);
});

// --- Keep-alive Settings ---
server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
