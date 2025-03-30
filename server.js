const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from a .env file (for secret management)
dotenv.config();

const app = express();
const port = 3000;

// Use body-parser middleware to parse POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Admin password stored in environment variable (use hashed password in production)
const adminPassword = process.env.ADMIN_PASSWORD || 'youradminpassword'; // replace with hashed password

// Serve static HTML files (your front-end)
app.use(express.static('public'));

// POST route to verify admin password
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === adminPassword) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.json({ success: false, message: 'Incorrect password' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
