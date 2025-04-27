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

// --- Files ---
const followersFile = path.join(__dirname, 'followers.json');
const messagesFile = path.join(__dirname, 'messages.json');
const viewerCountFile = path.join(__dirname, 'viewerCount.json');
const medicalRegistrationsFile = path.join(__dirname, 'medicalRegistrations.json');
const businessRegistrationsFile = path.join(__dirname, 'businessRegistrations.json');

// --- Data ---
let totalViewers = 0;
let totalFollowers = 0;
let activeUsers = []; // [{ username, deviceInfo }]
let messages = [];    // [{ text, sender, messageId, timestamp, replies: [] }]
let medicalRegistrations = [];   // [{ ... }]
let businessRegistrations = [];  // [{ ... }]
const MAX_MESSAGES = 100;

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

if (fs.existsSync(viewerCountFile)) {
    try {
        const data = fs.readFileSync(viewerCountFile, 'utf8');
        totalViewers = JSON.parse(data).count || 0;
    } catch (err) {
        console.error('Error reading viewer count file:', err);
    }
}

if (fs.existsSync(medicalRegistrationsFile)) {
    try {
        const data = fs.readFileSync(medicalRegistrationsFile, 'utf8');
        medicalRegistrations = JSON.parse(data) || [];
    } catch (err) {
        console.error('Error reading medical registrations file:', err);
    }
}

if (fs.existsSync(businessRegistrationsFile)) {
    try {
        const data = fs.readFileSync(businessRegistrationsFile, 'utf8');
        businessRegistrations = JSON.parse(data) || [];
    } catch (err) {
        console.error('Error reading business registrations file:', err);
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

function saveViewerCount() {
    try {
        fs.writeFileSync(viewerCountFile, JSON.stringify({ count: totalViewers }));
    } catch (err) {
        console.error('Error saving viewer count file:', err);
    }
}

function saveMedicalRegistrations() {
    try {
        fs.writeFileSync(medicalRegistrationsFile, JSON.stringify(medicalRegistrations, null, 2));
    } catch (err) {
        console.error('Error saving medical registrations:', err);
    }
}

function saveBusinessRegistrations() {
    try {
        fs.writeFileSync(businessRegistrationsFile, JSON.stringify(businessRegistrations, null, 2));
    } catch (err) {
        console.error('Error saving business registrations:', err);
    }
}

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

// --- API to register new Medical/Business entry ---
app.post('/api/register', (req, res) => {
    const { category, registrationData } = req.body;

    if (!category || !registrationData) {
        return res.status(400).json({ success: false, message: 'Missing category or registration data' });
    }

    if (category === 'Medical') {
        medicalRegistrations.push(registrationData);
        saveMedicalRegistrations();
    } else if (category === 'Business') {
        businessRegistrations.push(registrationData);
        saveBusinessRegistrations();
    } else {
        return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    res.json({ success: true, message: 'Registration saved successfully' });
});

// --- API to get all registrations ---
app.get('/api/registrations', (req, res) => {
    res.json({
        medical: medicalRegistrations,
        business: businessRegistrations
    });
});

// --- Socket.IO Events ---
io.on('connection', (socket) => {
    console.log('A user connected');
    totalViewers++;
    saveViewerCount();
    io.emit('viewerCountUpdate', totalViewers);
    socket.emit('followerCountUpdate', totalFollowers);

    let currentUser = `Guest${Math.floor(Math.random() * 10000)}`;
    let currentDevice = "Unknown Device";
    socket.username = currentUser;

    socket.on('joinChat', ({ username, deviceInfo }) => {
        currentUser = username || currentUser;
        currentDevice = deviceInfo || "Unknown Device";

        socket.username = currentUser;
        socket.deviceInfo = currentDevice;

        if (!activeUsers.find(u => u.username === currentUser)) {
            activeUsers.push({ username: currentUser, deviceInfo: currentDevice });
            io.emit('activeChattersUpdate', activeUsers);
        }

        socket.emit('loadMessages', messages);
    });

    socket.on('leaveChat', (username) => {
        activeUsers = activeUsers.filter(user => user.username !== username);
        io.emit('activeChattersUpdate', activeUsers);
    });

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

    socket.on('sendMessage', ({ text, messageId, timestamp }) => {
        const newMessage = {
            text,
            sender: socket.username || 'Someone',
            messageId,
            timestamp: timestamp || Date.now(),
            replies: []
        };

        messages.push(newMessage);

        if (messages.length > MAX_MESSAGES) {
            messages = messages.slice(-MAX_MESSAGES);
        }

        saveMessages();
        io.emit('newMessage', newMessage);
    });

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

    socket.on('updateMessage', ({ newText, messageId }) => {
        const message = messages.find(m => m.messageId === messageId);
        if (message) {
            message.text = newText;
            saveMessages();
            io.emit('updateMessage', { newText, messageId });
            console.log(`[Edit] Message ${messageId} updated.`);
        }
    });

    socket.on('deleteMessage', ({ messageId, isOwner }) => {
        if (isOwner) {
            messages = messages.filter(m => m.messageId !== messageId);
            saveMessages();
            io.emit('deleteMessage', { messageId });
            console.log(`[Delete] Message ${messageId} deleted by owner.`);
        }
    });

    socket.on('typing', ({ username }) => {
        socket.broadcast.emit('typing', { username });
    });

    socket.on('stopTyping', ({ username }) => {
        socket.broadcast.emit('stopTyping', { username });
    });

    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.username}`);
        totalViewers--;
        saveViewerCount();
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
