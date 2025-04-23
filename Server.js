require('dotenv').config(); // Load environment variables

const path = require('path'); // Moved back to CommonJS
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

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
    cookie: {
        secure: process.env.NODE_ENV === 'production',
    },
}));

// Serve static files
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

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;

module.exports = server;
