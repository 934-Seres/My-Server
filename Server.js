// --- Load Environment First ---
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

// --- Environment Variables ---
const PORT = process.env.PORT || 3000;
const OWNER_USERNAME = process.env.OWNER_USERNAME;
const OWNER_PASSWORD = process.env.OWNER_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;

if (!OWNER_USERNAME || !OWNER_PASSWORD || !SESSION_SECRET) {
    console.error('❌ .env configuration is missing OWNER_USERNAME, OWNER_PASSWORD, or SESSION_SECRET');
    process.exit(1);
}

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(express.static(path.join(__dirname, 'public')));

// --- File Paths ---
const followersFile = path.join(__dirname, 'followers.json');
const messagesFile = path.join(__dirname, 'messages.json');
const viewerCountFile = path.join(__dirname, 'viewerCount.json');
const medicalRegistrationsFile = path.join(__dirname, 'medicalRegistrations.json');
const businessRegistrationsFile = path.join(__dirname, 'businessRegistrations.json');
const storedDataFile = path.join(__dirname, 'storedData.json');

// --- Initial Data ---
let totalViewers = 0;
let totalFollowers = 0;
let activeUsers = [];
let messages = [];
let medicalRegistrations = [];
let businessRegistrations = [];
let storedMedicalData = [];
let storedBusinessData = [];
const MAX_MESSAGES = 100;

// --- Load Existing Data ---
function safeLoad(filePath, fallback) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8')) || fallback;
        }
    } catch (err) {
        console.error(`Error loading ${filePath}:`, err);
    }
    return fallback;
}

totalFollowers = safeLoad(followersFile, { count: 0 }).count || 0;
totalViewers = safeLoad(viewerCountFile, { count: 0 }).count || 0;
messages = safeLoad(messagesFile, []);
medicalRegistrations = safeLoad(medicalRegistrationsFile, []);
businessRegistrations = safeLoad(businessRegistrationsFile, []);
const storedData = safeLoad(storedDataFile, { medical: [], business: [] });
storedMedicalData = storedData.medical || [];
storedBusinessData = storedData.business || [];

// --- Save Functions ---
const saveToFile = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`Error saving to ${file}:`, err);
    }
};

const saveFollowerCount = () => saveToFile(followersFile, { count: totalFollowers });
const saveViewerCount = () => saveToFile(viewerCountFile, { count: totalViewers });
const saveMessages = () => saveToFile(messagesFile, messages);
const saveMedicalRegistrations = () => saveToFile(medicalRegistrationsFile, medicalRegistrations);
const saveBusinessRegistrations = () => saveToFile(businessRegistrationsFile, businessRegistrations);
const saveStoredData = () => saveToFile(storedDataFile, { medical: storedMedicalData, business: storedBusinessData });

// --- Routes ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'businessesmedical.html'));
});

app.get('/get-stored-data', (req, res) => {
    res.json({ medical: storedMedicalData, business: storedBusinessData });
});

app.post('/save-stored-data', (req, res) => {
    const { medical, business } = req.body;
    if (!Array.isArray(medical) || !Array.isArray(business)) {
        return res.status(400).json({ success: false, message: 'Invalid data format' });
    }

    storedMedicalData = medical;
    storedBusinessData = business;
    saveStoredData();
    res.sendStatus(200);
});

app.post('/verify-owner', (req, res) => {
    const { password } = req.body;
    if (password === OWNER_PASSWORD) {
        req.session.isOwner = true;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
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
    req.session.destroy(() => res.json({ success: true }));
});

app.get('/check-owner', (req, res) => {
    res.json({ isOwner: !!req.session.isOwner });
});

// --- Registration ---
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

app.get('/api/registrations', (req, res) => {
    res.json({ medical: medicalRegistrations, business: businessRegistrations });
});

// --- Socket.IO ---
io.on('connection', (socket) => {
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
        }
    });

    socket.on('deleteMessage', ({ messageId, isOwner }) => {
        if (isOwner) {
            messages = messages.filter(m => m.messageId !== messageId);
            saveMessages();
            io.emit('deleteMessage', { messageId });
        }
    });

    socket.on('typing', ({ username }) => {
        socket.broadcast.emit('typing', { username });
    });

    socket.on('stopTyping', ({ username }) => {
        socket.broadcast.emit('stopTyping', { username });
    });

    socket.on('disconnect', () => {
        totalViewers--;
        saveViewerCount();
        io.emit('viewerCountUpdate', totalViewers);
        activeUsers = activeUsers.filter(user => user.username !== socket.username);
        io.emit('activeChattersUpdate', activeUsers);
    });
});

// --- Server ---
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running with Socket.IO at http://localhost:${PORT}`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
