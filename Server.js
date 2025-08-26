"use strict";
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const nodemailer = require("nodemailer");

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser'); 
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const multer = require("multer");

const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3000;
const OWNER_USERNAME = process.env.OWNER_USERNAME;
const OWNER_PASSWORD = process.env.OWNER_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;

if (!OWNER_USERNAME || !OWNER_PASSWORD || !SESSION_SECRET) {
    console.error('❌ Missing environment variables: OWNER_USERNAME, OWNER_PASSWORD, or SESSION_SECRET');
    process.exit(1);
}

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

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}


const storedDataPath = path.join(dataDir, 'storedData.json');
const followersFile = path.join(__dirname, 'followers.json');
const viewerCountFile = path.join(__dirname, 'viewerCount.json');
const messagesFile = path.join(__dirname, 'messages.json');
const slideshowDataFile = path.join(__dirname, 'slideshowData.json');
// --- Cities persistence ---
const citiesFile = path.join(__dirname, "cities.json");

// Ensure cities.json exists
if (!fs.existsSync(citiesFile)) {
    fs.writeFileSync(citiesFile, JSON.stringify({ customCities: [] }, null, 2), "utf8");
}

// Ensure showcaseData.json exists
// ----------------------
// Path to showcase JSON
const showcaseFile = path.join(__dirname, 'showcaseData.json');

// Multer setup
const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });



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


// ensure file persistence also includes showcase data
try {
    if (!fs.existsSync(storedDataPath)) {
        fs.writeFileSync(storedDataPath, JSON.stringify({
            storedMedicalData: [],
            storedBusinessData: [],
        
        }, null, 2));
    }
    const fileContent = fs.readFileSync(storedDataPath, 'utf-8');
    const parsed = JSON.parse(fileContent);
    storedMedicalData = parsed.storedMedicalData || [];
    storedBusinessData = parsed.storedBusinessData || [];
    
} catch (err) {
    console.error('Error handling storedData.json:', err);
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
    saveToFile(storedDataPath, {
        storedMedicalData,
        storedBusinessData
    });
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // 'aragaw007@gmail.com'
    pass: process.env.EMAIL_PASS  // your Gmail App Password
  }
});



function sendChatAlert(sender, messageText) {
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // or use SMS gateway email address later
    subject: '📨 New Message on Your Website Chat',
    text: `💬 ${sender} says: "${messageText}"`
  }, (err, info) => {
    if (err) {
      console.error('❌ Failed to send email:', err);
    } else {
      console.log('✅ Email sent:', info.response);
    }
  });
}



app.get('/get-advert-notice-data', (_req, res) => {
    res.json({ advert: storedAdvertData, notice: storedNoticeData });
});
// Utility function to safely read storedData.json
function readStoredData() {
    const filePath = path.join(__dirname, 'storedData.json');
    let fileData = { storedMedicalData: [], storedBusinessData: [] };

    if (fs.existsSync(filePath)) {
        try {
            fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (err) {
            console.error("Error parsing storedData.json:", err);
        }
    }

    return fileData;
}
// Utility function to safely write storedData.json
function writeStoredData(fileData) {
    const filePath = path.join(__dirname, 'storedData.json');
    try {
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    } catch (err) {
        console.error("Error writing storedData.json:", err);
    }
}

// --- API Routes ---
app.post('/save-stored-data', (req, res) => {
    const { storedMedicalData: medical, storedBusinessData: business } = req.body;
    if (!Array.isArray(medical) || !Array.isArray(business)) {
        return res.status(400).json({ success: false, message: 'Invalid data format' });
    }

    storedMedicalData = medical;
    storedBusinessData = business;    
    saveStoredData();
    res.redirect('/thank-you');
});

app.get('/get-stored-data', (req, res) => {
    try {
        const rawData = fs.readFileSync(storedDataPath, 'utf8');
        const data = JSON.parse(rawData);
        res.json({
            storedMedicalData: data.storedMedicalData || [],
            storedBusinessData: data.storedBusinessData || []
        });
    } catch (err) {
        console.error("Error reading stored data:", err);
        res.json({ storedMedicalData: [], storedBusinessData: [] });
    }
});


/*app.post('/delete-stored-data', (req, res) => {
    const { type, index } = req.body;
    if (!['medical', 'business'].includes(type)) {
        return res.status(400).json({ error: "Invalid request type" });
    }

    const fileData = readStoredData();
    let targetArray = type === 'medical' ? fileData.storedMedicalData : fileData.storedBusinessData;

    if (index >= 0 && index < targetArray.length) {
        targetArray.splice(index, 1);
    }

    writeStoredData(fileData);
    res.json({ success: true, data: fileData });
});*/


app.post('/update-categories', (req, res) => {
    const { type, category } = req.body;
    if (type === "medical") {
        if (!medicalCategories.includes(category)) {
            medicalCategories.push(category);
        }
    } else if (type === "business") {
        if (!businessCategories.includes(category)) {
            businessCategories.push(category);
        }
    }
    saveStoredData();
    res.json({ success: true });
});


// Check registration based on storedMedicalData and storedBusinessData
app.get("/check-registration", (req, res) => {
  try {
    const filePath = path.join(__dirname, "data", "storedData.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(fileContent);

    const registeredData = [
      ...(parsed.storedMedicalData || []),
      ...(parsed.storedBusinessData || []),
     

    ];

    res.json({ registered: registeredData.length > 0, registeredData });
  } catch (err) {
    console.error("Error reading registration data:", err);
    res.json({ registered: false, registeredData: [] });
  }
});


// Upload showcase
app.post("/upload-showcase", upload.single("image"), (req, res) => {
    const { title, description, authorName, authorContact } = req.body;

    try {
        const data = fs.readFileSync(showcaseFile, "utf8");
        const showcases = JSON.parse(data || "[]");

        const newShowcase = {
            id: Date.now().toString(),
            title,
            description,
            authorName,
            authorContact,
            image: req.file ? `/uploads/${req.file.filename}` : ""
        };

        showcases.push(newShowcase);
        fs.writeFileSync(showcaseFile, JSON.stringify(showcases, null, 2), "utf8");

        res.json({ success: true, newShowcase });
    } catch (err) {
        console.error("Error uploading showcase:", err);
        res.json({ success: false, message: "Server error while saving showcase" });
    }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
// Get showcases
app.get("/get-showcases", (req, res) => {
    try {
        const data = fs.readFileSync(showcaseFile, "utf8");
        const showcases = JSON.parse(data || "[]");
        res.json({ storedShowcaseData: showcases });
    } catch (err) {
        console.error(err);
        res.json({ storedShowcaseData: [] });
    }
});


// Delete showcase
app.delete("/delete-showcase/:id", (req, res) => {
    try {
        const data = fs.readFileSync(showcaseFile, "utf8");
        let showcases = JSON.parse(data || "[]");
        const id = req.params.id;

        const index = showcases.findIndex(sc => sc.id === id);
        if (index === -1) return res.json({ success: false, message: "Showcase not found" });

        showcases.splice(index, 1);
        fs.writeFileSync(showcaseFile, JSON.stringify(showcases, null, 2), "utf8");

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Server error while deleting showcase" });
    }
});



// GET route to load slideshow data
app.get('/get-slideshow-data', (_req, res) => {
    const filePath = path.join(__dirname, 'slideshowData.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read slideshow data:', err);
            return res.json({ advertMessages: [], noticeMessages: [], storedDatas: { advert: [], notice: [] } });
        }
        try {
            const parsed = JSON.parse(data);
            res.json(parsed);
        } catch (e) {
            console.error('Failed to parse slideshow data:', e);
            res.json({ advertMessages: [], noticeMessages: [], storedDatas: { advert: [], notice: [] } });
        }
    });
});

// POST route to save slideshow data
app.post('/save-slideshow-data', (req, res) => {
    const filePath = path.join(__dirname, 'slideshowData.json');
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            console.error('Failed to write slideshow data:', err);
            return res.status(500).send('Failed to save data.');
        }
        res.sendStatus(200);
    });
});


app.post('/register-medical', (req, res) => {
    const newEntry = req.body;
    const isDuplicate = storedMedicalData.some(entry =>
        entry.name === newEntry.name &&
        entry.city === newEntry.city &&
        entry.category === newEntry.category
    );
    if (!isDuplicate) {
        storedMedicalData.push(newEntry);
        saveStoredData();
    }
    res.redirect('/thank-you');
});

app.post('/register-business', (req, res) => {
    const newEntry = req.body;
    const isDuplicate = storedBusinessData.some(entry =>
        entry.name === newEntry.name &&
        entry.city === newEntry.city &&
        entry.category === newEntry.category
    );
    if (!isDuplicate) {
        storedBusinessData.push(newEntry);
        saveStoredData();
    }
    res.redirect('/thank-you');
});

app.get('/register-medical', (_req, res) => res.json(storedMedicalData));
app.get('/register-business', (_req, res) => res.json(storedBusinessData));
// --- City filter routes ---
app.get("/get-cities", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(citiesFile, "utf-8"));
        res.json(data.customCities || []);
    } catch (err) {
        console.error("Error reading cities.json:", err);
        res.status(500).json({ error: "Failed to load cities" });
    }
});

app.post("/add-city", (req, res) => {
    try {
        const { city } = req.body;
        if (!city || city.trim() === "") {
            return res.status(400).json({ error: "City name required" });
        }

        const data = JSON.parse(fs.readFileSync(citiesFile, "utf-8"));
        const formattedCity = city.trim();

        if (!data.customCities.includes(formattedCity)) {
            data.customCities.push(formattedCity);
            fs.writeFileSync(citiesFile, JSON.stringify(data, null, 2), "utf8");
        }

        res.json({ success: true, city: formattedCity });
    } catch (err) {
        console.error("Error saving city:", err);
        res.status(500).json({ error: "Failed to save city" });
    }
});

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
app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://my-server-2xjg.onrender.com';
    const today = new Date().toISOString().split('T')[0];

    // 1) Static routes
    const staticRoutes = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/register-medical', changefreq: 'weekly', priority: 0.8 },
      { url: '/register-business', changefreq: 'weekly', priority: 0.8 },
      { url: '/chat', changefreq: 'daily', priority: 0.6 },
      { url: '/about', changefreq: 'monthly', priority: 0.5 },
      { url: '/contact', changefreq: 'monthly', priority: 0.5 },
      { url: '/news', changefreq: 'daily', priority: 0.7 }
    ];

    // 2) Fetch dynamic routes (example if using PostgreSQL)
    const { rows: medicalRows } = await pool.query('SELECT id, name FROM medical');
    const { rows: businessRows } = await pool.query('SELECT id, name FROM business');

    // Convert names into slugs (url-friendly)
    const slugify = (text) =>
      text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const dynamicRoutes = [
      ...medicalRows.map(m => ({
        url: `/listing/medical/${slugify(m.name)}-${m.id}`,
        changefreq: 'monthly',
        priority: 0.7
      })),
      ...businessRows.map(b => ({
        url: `/listing/business/${slugify(b.name)}-${b.id}`,
        changefreq: 'monthly',
        priority: 0.7
      }))
    ];

    // 3) Merge static + dynamic
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // 4) Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);

  } catch (err) {
    console.error("Error generating sitemap:", err);
    res.status(500).send("Error generating sitemap");
  }
});

// --- Socket.IO ---
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

    // --- Message Handling --- 
    socket.on('sendMessage', ({ text, messageId, timestamp }) => {
        const newMessage = {
            text,
            sender: socket.username, // keep original username
            messageId: messageId || uuidv4(),
            timestamp: timestamp || Date.now(),
            replies: []
        };

        messages.push(newMessage);
        if (messages.length > MAX_MESSAGES) {
            messages = messages.slice(-MAX_MESSAGES);
        }

        saveMessages();

        // ✅ Emit with extra flag: isSelf
        io.to(socket.id).emit('newMessage', { ...newMessage, isSelf: true });
        socket.broadcast.emit('newMessage', { ...newMessage, isSelf: false });

        // ✅ Email alert for new message only
        sendChatAlert(socket.username, text);
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

            // ✅ Emit with self flag
            io.to(socket.id).emit('newReply', { ...reply, messageId, isSelf: true });
            socket.broadcast.emit('newReply', { ...reply, messageId, isSelf: false });
        }
    });

    socket.on('updateMessage', ({ newText, messageId }) => {
        const message = messages.find(m => m.messageId === messageId);
        if (message) {
            message.text = newText;
            saveMessages();

            // ✅ Send update with info if self
            io.to(socket.id).emit('updateMessage', { newText, messageId, isSelf: true });
            socket.broadcast.emit('updateMessage', { newText, messageId, isSelf: false });
        }
    });

    socket.on('deleteMessage', ({ messageId }) => {
        const index = messages.findIndex(msg => msg.messageId === messageId);
        if (index !== -1) {
            messages.splice(index, 1);
            saveMessages();

            // ✅ reload with self/others flag not really needed, but kept consistent
            io.to(socket.id).emit('loadMessages', messages.map(m => ({ ...m, isSelf: (m.sender === socket.username) })));
            socket.broadcast.emit('loadMessages', messages.map(m => ({ ...m, isSelf: false })));
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
