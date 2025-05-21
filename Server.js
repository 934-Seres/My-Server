
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
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000 // 1 hour
    }
}));

//  Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'businessesmedical.html'));
});


// ---  File Paths Setup ---
const followersFile = path.join(__dirname, 'followers.json');
const viewerCountFile = path.join(__dirname, 'viewerCount.json');
const messagesFile = path.join(__dirname, 'messages.json');
const slideshowDataFile = path.join(__dirname, 'slideshowData.json');

// --- Initial State Variables ---
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

try {
  const storedRaw = fs.readFileSync('storedData.json');
  const parsed = JSON.parse(storedRaw);
  storedMedicalData = parsed.storedMedicalData || [];
  storedBusinessData = parsed.storedBusinessData || [];
} catch (err) {
  console.error("Error loading storedData.json:", err);
}


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

const slideshowData = safeLoad(slideshowDataFile, { advertMessages: [], noticeMessages: [], storedDatas: { advert: [], notice: [] } });

advertMessages = slideshowData.advertMessages;
noticeMessages = slideshowData.noticeMessages;
storedAdvertData = slideshowData.storedDatas.advert;
storedNoticeData = slideshowData.storedDatas.notice;


const saveStoredData = () => {
  const storedData = {
    storedMedicalData,
    storedBusinessData
  };
  saveToFile(path.join(__dirname, 'storedData.json'), storedData);
};

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
    fs.writeFileSync(slideshowDataFile, JSON.stringify(data, null, 2));  // Save formatted JSON data
}


// Function to load data from slideshowData.json
function loadData() {
    try {
        const data = fs.readFileSync(slideshowDataFile);  // Read the data from the file
        return JSON.parse(data);  // Parse and return the JSON data
    } catch (err) {
        // If the file does not exist or an error occurs, return default structure
        return { advertMessages: [], noticeMessages: [], storedDatas: { advert: [], notice: [] } };
    }
}

  
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



app.post('/save-stored-data', (req, res) => {
    const { storedMedicalData: medical, storedBusinessData: business } = req.body;
    storedMedicalData = medical;
    storedBusinessData = business;
    saveStoredData(); // Uses your existing save function
    res.json({ success: true });
});


app.get('/get-stored-data', (req, res) => {
    try {
        const rawData = fs.readFileSync(path.join(__dirname, 'storedData.json'));
        const data = JSON.parse(rawData);
        res.json(data);
    } catch (err) {
        console.error("Error reading stored data:", err);
        res.json({ medical: [], business: [] });
    }
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

app.post('/register-medical', (req, res) => {
  const medicalEntry = req.body;
  storedMedicalData.push(medicalEntry);
  saveStoredData();  // 👈 Save changes to disk
  res.sendStatus(200);
});

app.post('/register-business', (req, res) => {
  const businessEntry = req.body;
  storedBusinessData.push(businessEntry);
  saveStoredData();  // 👈 Save changes to disk
  res.sendStatus(200);
});

// Get all registered medical entries
app.get('/get-registered-medical', (req, res) => {
    res.json(storedMedicalData);
});

// Get all registered business entries
app.get('/get-registered-business', (req, res) => {
    res.json(storedBusinessData);
});


// --- Authentication ---


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
        req.session.regenerate((err) => {
            if (err) {
                console.error('Session regeneration failed:', err);
                return res.status(500).json({ success: false, message: 'Session error' });
            }
            req.session.isOwner = true;
            res.json({ success: true });
        });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err);
            return res.status(500).json({ success: false });
        }
        res.clearCookie('connect.sid'); // Optional: clear cookie
        res.json({ success: true });
    });
});

app.get('/check-owner', (req, res) => {
    res.json({ isOwner: !!req.session.isOwner });
});

// Optional — consider removing this for security
// app.post('/verify-owner', (req, res) => {
//     res.json({ success: req.body.password === OWNER_PASSWORD });
// });


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
   socket.on('deleteMessage', ({ messageId }) => {
    // Your logic to find and remove the message by messageId from storage
    const index = messages.findIndex(msg => msg.messageId === messageId);
    if (index !== -1) {
        messages.splice(index, 1);
        // Emit the updated messages list to all clients
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