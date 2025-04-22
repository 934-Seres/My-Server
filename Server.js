// Load environment variables
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or fallback to 3000

// Dummy owner credentials (should be stored securely, hashed in production)
const OWNER_USERNAME = process.env.OWNER_USERNAME || 'admin'; // Default for development
const OWNER_PASSWORD = process.env.OWNER_PASSWORD || 'secret123'; // Default for development

// Use CORS for handling cross-origin requests
app.use(cors());

// Use body parser to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session with environment variables (production settings)
app.use(session({
    secret: process.env.SESSION_SECRET || 'super-secret-key', // Default session secret for development
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Cookies are secure in production (use HTTPS)
    },
}));

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(__dirname + '/public'));

// --- Login route ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
        req.session.isOwner = true;
        return res.json({ success: true });
    } else {
        return res.json({ success: false, message: 'Invalid credentials' });
    }
});

// --- Logout route ---
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// --- Route to check if user is owner ---
app.get('/check-owner', (req, res) => {
    res.json({ isOwner: !!req.session.isOwner });
});

// --- Production/Development mode check ---
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode');
} else {
    console.log('Running in development mode');
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
