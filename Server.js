
// --- Load Environment First => Strict Mode and Core Modules ---
"use strict";
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const slideshowDataPath = './slideshowData.json';  // The path where the slideshow data will be stored
// Essential Libraries & Server Setup---
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser'); 
const { v4: uuidv4 } = require('uuid');



const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
// Server and Socket Initialization ---
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
        sameSite: 'lax'
      }
      
}));
//  Static Files
app.use(express.static(path.join(__dirname, 'public')));

// ---  File Paths Setup ---
const followersFile = path.join(__dirname, 'followers.json');
const viewerCountFile = path.join(__dirname, 'viewerCount.json');
const messagesFile = path.join(__dirname, 'messages.json');
const medicalFile = path.join(__dirname, 'medicalRegistrations.json');
const businessFile = path.join(__dirname, 'businessRegistrations.json');
const storedDataFile = path.join(__dirname, 'storedData.json');
const slideshowDataFile = slideshowDataPath.join(__dirname, 'slideshowData.json');

// --- Initial State Variables ---
let totalViewers = 0;
let totalFollowers = 0;
let messages = [];
let activeUsers = [];
let medicalRegistrations = [];
let businessRegistrations = [];
let storedMedicalData = [];
let storedBusinessData = [];
let advertMessages = [];
let noticeMessages = [];
let storedAdvertData = [];
let storedNoticeData = [];
const MAX_MESSAGES = 100;
// --- Safe File Load Function ---
function safeLoad(filePath, fallback) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8')) || fallback;
        }
    }
    catch (err) {
        console.error(`Error reading ${filePath}:`, err);
    }
    return fallback;
}

// --- Load Data From Files ---
totalViewers = safeLoad(viewerCountFile, { count: 0 }).count;
totalFollowers = safeLoad(followersFile, { count: 0 }).count;
messages = safeLoad(messagesFile, []);
medicalRegistrations = safeLoad(medicalFile, []);
businessRegistrations = safeLoad(businessFile, []);
const storedData = safeLoad(storedDataFile, { medical: [], business: [] });
storedMedicalData = storedData.medical;
storedBusinessData = storedData.business;
const slideshowData = safeLoad(slideshowDataFile, { advertMessages: [], noticeMessages: [], storedDatas: { advert: [], notice: [] } });
advertMessages = slideshowData.advertMessages;
noticeMessages = slideshowData.noticeMessages;
storedAdvertData = slideshowData.storedDatas.advert;
storedNoticeData = slideshowData.storedDatas.notice;

// --- File Saving Helpers ---
const saveToFile = async (file, data) => {
    try {
      await fs.promises.writeFile(file, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(`Error writing to ${file}:`, err);
    }
  };
  // Function to save data to slideshowData.json
function saveData(data) {
    fs.writeFileSync(slideshowDataPath, JSON.stringify(data, null, 2));  // Save formatted JSON data
}

// Function to load data from slideshowData.json
function loadData() {
    try {
        const data = fs.readFileSync(slideshowDataPath);  // Read the data from the file
        return JSON.parse(data);  // Parse and return the JSON data
    } catch (err) {
        // If the file does not exist or an error occurs, return default structure
        return { advertMessages: [], noticeMessages: [], storedDatas: { advert: [], notice: [] } };
    }
}

  
const saveMessages = () => saveToFile(messagesFile, messages);
const saveViewerCount = () => saveToFile(viewerCountFile, { count: totalViewers });
const saveFollowerCount = () => saveToFile(followersFile, { count: totalFollowers });
const saveMedicalData = () => saveToFile(medicalFile, medicalRegistrations);
const saveBusinessData = () => saveToFile(businessFile, businessRegistrations);
const saveStoredData = () => saveToFile(storedDataFile, { medical: storedMedicalData, business: storedBusinessData });
const saveSlideshowData = () => saveToFile(slideshowDataFile, {
    advertMessages,
    noticeMessages,
    storedDatas: {
        advert: storedAdvertData,
        notice: storedNoticeData
    }
});
// --- Routes: Static Page ---
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'businessesmedical.html'));
});
// --- Unified Stored Slideshow Data for All Devices ---
app.get('/get-advert-notice-data', (_req, res) => {
    res.json({
        advert: storedAdvertData,
        notice: storedNoticeData
    });
});

app.post('/save-advert-notice-data', (req, res) => {
    const { advert, notice } = req.body;
    if (!Array.isArray(advert) || !Array.isArray(notice)) {
        return res.status(400).json({ success: false, message: 'Invalid data format' });
    }
    storedAdvertData = advert;
    storedNoticeData = notice;
    saveSlideshowData(); // ✅ Fix: Use slideshow data saver to persist across devices
    res.sendStatus(200);
});


// --- Stored Data API:Stored Registration Data ---
app.get('/get-stored-data', (_req, res) => {
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
// Endpoint to get stored slideshow data
app.get('/get-slideshow-data', (req, res) => {
    const data = loadData();  // Load the data from the file
    res.json(data);  // Send the data as a JSON response
});

// Endpoint to save slideshow data
app.post('/save-slideshow-data', (req, res) => {
    const data = req.body;  // Get the data sent from the frontend
    saveData(data);  // Save the data to the file
    res.status(200).send('Data saved successfully');  // Send success response
});

// --- Authentication ---
app.post('/verify-owner', (req, res) => {
    res.json({ success: req.body.password === OWNER_PASSWORD });
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
        req.session.isOwner = true;
        res.json({ success: true });
    }
    else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});
app.post('/logout', (req, res) => {
    req.session.destroy(() => res.json({ success: true }));
});
app.get('/check-owner', (req, res) => {
    res.json({ isOwner: !!req.session.isOwner });
});
// ---Registration API: Registration ---
app.post('/api/register', (req, res) => {
    const { category, registrationData } = req.body;
    if (!category || !registrationData) {
        return res.status(400).json({ success: false, message: 'Missing data' });
    }
    if (category === 'Medical') {
        medicalRegistrations.push(registrationData);
        saveMedicalData();
    }
    else if (category === 'Business') {
        businessRegistrations.push(registrationData);
        saveBusinessData();
    }
    else {
        return res.status(400).json({ success: false, message: 'Invalid category' });
    }
    res.json({ success: true, message: 'Registration saved' });
});
app.get('/api/registrations', (req, res) => {
    res.json({ medical: medicalRegistrations, business: businessRegistrations });
});
// --- Socket.IO – Real-time Chat + Stats: Socket.IO Chat and Stats ---
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
        if (totalFollowers > 0)
            totalFollowers--;
        saveFollowerCount();
        io.emit('followerCountUpdate', totalFollowers);
    });
    socket.on('sendMessage', ({ text, messageId, timestamp }) => {
        const newMessage = {
            text,
            sender: socket.username,
            messageId: messageId || uuidv4(), // <- Use UUID if not provided
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
            io.emit('newReply', Object.assign(Object.assign({}, reply), { messageId }));
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
        activeUsers = activeUsers.filter(u => u.username !== socket.username);
        io.emit('activeChattersUpdate', activeUsers);
    });
});
// --- Start Server ---
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
