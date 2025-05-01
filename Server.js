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

// --- File Paths ---
const followersFile = path.join(__dirname, 'followers.json');
const messagesFile = path.join(__dirname, 'messages.json');
const viewerCountFile = path.join(__dirname, 'viewerCount.json');
const medicalRegistrationsFile = path.join(__dirname, 'medicalRegistrations.json');
const businessRegistrationsFile = path.join(__dirname, 'businessRegistrations.json');
const storedDataPath = path.join(__dirname, 'storedData.json');

// --- Initial Data ---
let totalViewers = 0;
let totalFollowers = 0;
let activeUsers = [];
let messages = [];
let medicalRegistrations = [];
let businessRegistrations = [];
let storedData = { medical: {}, business: {} };
const MAX_MESSAGES = 100;

// --- Load Data Helper ---
const loadData = (filePath, defaultValue) => {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8')) || defaultValue;
        }
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
    }
    return defaultValue;
};

// --- Load on Startup ---
storedData = loadData(storedDataPath, { medical: {}, business: {} });
totalFollowers = loadData(followersFile, { count: 0 }).count;
messages = loadData(messagesFile, []);
totalViewers = loadData(viewerCountFile, { count: 0 }).count;
medicalRegistrations = loadData(medicalRegistrationsFile, []);
businessRegistrations = loadData(businessRegistrationsFile, []);

// --- Save Data Helpers ---
const saveData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`Error writing ${filePath}:`, err);
    }
};

const saveStoredData = () => saveData(storedDataPath, storedData);
const saveFollowerCount = () => saveData(followersFile, { count: totalFollowers });
const saveMessages = () => saveData(messagesFile, messages);
const saveViewerCount = () => saveData(viewerCountFile, { count: totalViewers });
const saveMedicalRegistrations = () => saveData(medicalRegistrationsFile, medicalRegistrations);
const saveBusinessRegistrations = () => saveData(businessRegistrationsFile, businessRegistrations);

// --- Routes ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'businessesmedical.html'));
});

app.get('/data', (req, res) => {
    res.json(storedData);
});

app.post('/register', (req, res) => {
    const { type, category, name, industryOrService, licenseNumber, location, contact_info, city } = req.body;
    if (!storedData[type][category]) {
        storedData[type][category] = [];
    }
    storedData[type][category].push({ name, industryOrService, licenseNumber, location, contact_info, city });
    saveStoredData();
    res.json({ success: true, message: 'Registration successful' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
        req.session.isOwner = true;
        return res.json({ success: true });
    }
    res.json({ success: false, message: 'Invalid credentials' });
});

app.post('/logout', (req, res) => {
    req.session.destroy(() => res.json({ success: true }));
});

app.get('/check-owner', (req, res) => {
    res.json({ isOwner: !!req.session.isOwner });
});

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
    res.json({
        medical: medicalRegistrations,
        business: businessRegistrations
    });
});

app.get('/get-stored-data', (req, res) => {
    res.json(storedData);
});

app.post('/save-stored-data', (req, res) => {
    storedData = {
        medical: req.body.medical || {},
        business: req.body.business || {}
    };
    saveStoredData();
    res.json({ status: 'success' });
});

// --- Socket.IO Events ---
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
        const parent = messages.find(m => m.messageId === messageId);
        if (parent) {
            const reply = {
                replyText,
                sender: socket.username || 'Someone',
                messageId,
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

// --- Start Server ---
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
