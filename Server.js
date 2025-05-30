// --- Load Environment First => Strict Mode and Core Modules ---
"use strict";
require('dotenv').config();
const path = require('path');
const fs = require('fs');

// Essential Libraries & Server Setup---
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser'); 
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

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
    console.error('❌ Missing environment variables: OWNER_USERNAME, OWNER_PASSWORD, or SESSION_SECRET');
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
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'businessesmedical.html'));
});

// --- File Paths ---
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const storedDataPath = path.join(dataDir, 'storedData.json');
const followersFile = path.join(__dirname, 'followers.json');
const viewerCountFile = path.join(__dirname, 'viewerCount.json');
const messagesFile = path.join(__dirname, 'messages.json');
const slideshowDataFile = path.join(__dirname, 'slideshowData.json');

// --- State Variables ---
let totalViewers = 0;
let totalFollowers = 0;
let messages = [];
let activeUsers = [];
let advertMessages = [];
let noticeMessages = [];
let storedAdvertData = [];
let storedNoticeData = [];
let storedMedicalData = [];
let storedBusinessData = [];

// --- Ensure storedData.json exists, then read ---
try {
    if (!fs.existsSync(storedDataPath)) {
        fs.writeFileSync(storedDataPath, JSON.stringify({
            storedMedicalData: [],
            storedBusinessData: []
        }, null, 2));
    }
    const fileContent = fs.readFileSync(storedDataPath, 'utf-8');
    const parsed = JSON.parse(fileContent);
    storedMedicalData = parsed.storedMedicalData || [];
    storedBusinessData = parsed.storedBusinessData || [];
} catch (err) {
    console.error('Error handling storedData.json:', err);
    storedMedicalData = [];
    storedBusinessData = [];
}

const MAX_MESSAGES = 100;
const safeLoad = (filePath, fallback) => {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8')) || fallback;
        }
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
    }
    return fallback;
};

// --- Load other data ---
totalViewers = safeLoad(viewerCountFile, { count: 0 }).count;
totalFollowers = safeLoad(followersFile, { count: 0 }).count;
messages = safeLoad(messagesFile, []);
const slideshowData = safeLoad(slideshowDataFile, { advertMessages: [], noticeMessages: [], storedDatas: { advert: [], notice: [] } });
advertMessages = slideshowData.advertMessages;
noticeMessages = slideshowData.noticeMessages;
storedAdvertData = slideshowData.storedDatas.advert;
storedNoticeData = slideshowData.storedDatas.notice;

const saveToFile = async (file, data) => {
    try {
        await fs.promises.writeFile(file, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`Error writing to ${file}:`, err);
    }
};

const saveStoredData = () => {
    const data = {
        storedMedicalData,
        storedBusinessData
    };
    saveToFile(storedDataPath, data);
};

const saveMessages = () => saveToFile(messagesFile, messages);
const saveViewerCount = () => saveToFile(viewerCountFile, { count: totalViewers });
const saveFollowerCount = () => saveToFile(followersFile, { count: totalFollowers });
const saveSlideshowData = () => saveToFile(slideshowDataFile, {
    advertMessages,
    noticeMessages,
    storedDatas: {
        advert: storedAdvertData,
        notice: storedNoticeData
    }
});

// --- API Routes ---
app.post('/save-stored-data', (req, res) => {
    const { storedMedicalData: medical, storedBusinessData: business } = req.body;
    storedMedicalData = medical;
    storedBusinessData = business;
    saveStoredData();
    res.json({ success: true });
});

app.get('/get-stored-data', (req, res) => {
    try {
        const rawData = fs.readFileSync(storedDataPath);
        const data = JSON.parse(rawData);
        res.json(data);
    } catch (err) {
        console.error("Error reading stored data:", err);
        res.json({ medical: [], business: [] });
    }
});

app.get('/get-advert-notice-data', (_req, res) => {
    res.json({ advert: storedAdvertData, notice: storedNoticeData });
});

app.post('/save-advert-notice-data', (req, res) => {
    const { advert, notice } = req.body;
    if (!Array.isArray(advert) || !Array.isArray(notice)) {
        return res.status(400).json({ success: false, message: 'Invalid data format' });
    }
    storedAdvertData = advert;
    storedNoticeData = notice;
    saveSlideshowData();
    res.sendStatus(200);
});

app.get('/get-slideshow-data', (req, res) => {
    res.json(slideshowData);
});

app.post('/save-slideshow-data', (req, res) => {
    saveToFile(slideshowDataFile, req.body);
    res.status(200).send('Data saved successfully');
});

app.post('/register-medical', (req, res) => {
    storedMedicalData.push(req.body);
    saveStoredData();
    res.sendStatus(200);
});

app.post('/register-business', (req, res) => {
    storedBusinessData.push(req.body);
    saveStoredData();
    res.sendStatus(200);
});

app.get('/register-medical', (req, res) => res.json(storedMedicalData));
app.get('/register-business', (req, res) => res.json(storedBusinessData));

// --- Auth ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
        req.session.regenerate((err) => {
            if (err) return res.status(500).json({ success: false, message: 'Session error' });
            req.session.isOwner = true;
            res.json({ success: true });
        });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ success: false });
        res.clearCookie('connect.sid');
        res.json({ success: true });
    });
});

app.get('/check-owner', (req, res) => {
    res.json({ isOwner: !!req.session.isOwner });
});

// --- Socket.IO Chat and Stats ---
io.on('connection', (socket) => {
    totalViewers++;
    saveViewerCount();
    io.emit('viewerCountUpdate', totalViewers);
    socket.emit('followerCountUpdate', totalFollowers);

    let currentUser;
    do {
        currentUser = `Guest${Math.floor(Math.random() * 10000)}`;
    } while (activeUsers.find(u => u.username === currentUser));

    socket.username = currentUser;

    socket.on('joinChat', ({ username, deviceInfo }) => {
        currentUser = username || currentUser;
        socket.username = currentUser;
        if (!activeUsers.find(u => u.username === currentUser)) {
            activeUsers.push({ username: currentUser, deviceInfo });
            io.emit('activeChattersUpdate', activeUsers);
        }
        socket.emit('loadMessages', messages);
    });

    socket.on('leaveChat', (username) => {
        activeUsers = activeUsers.filter(u => u.username !== username);
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
            sender: socket.username,
            messageId: messageId || uuidv4(),
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
        const parent = messages.find(m => m.messageId === messageId);
        if (parent) {
            const reply = {
                replyText,
                sender: socket.username,
                timestamp: timestamp || Date.now()
            };
            parent.replies.push(reply);
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

    socket.on('deleteMessage', ({ messageId }) => {
        const index = messages.findIndex(msg => msg.messageId === messageId);
        if (index !== -1) {
            messages.splice(index, 1);
            io.emit('loadMessages', messages);
        }
    });

    socket.on('typing', ({ username }) => {
        socket.broadcast.emit('typing', { username });
    });

    socket.on('stopTyping', ({ username }) => {
        socket.broadcast.emit('stopTyping', { username });
    });

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter(u => u.username !== socket.username);
        io.emit('activeChattersUpdate', activeUsers);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;