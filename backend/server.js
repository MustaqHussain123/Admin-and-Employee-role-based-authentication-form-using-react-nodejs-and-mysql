const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login" 
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit the process if database connection fails
    }
    console.log('Connected to MySQL database');
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint to handle signup POST requests
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO nast (username, email, password, phone, role) VALUES (?, ?, ?, ?, ?)";
    const { username, email, password, phone, role } = req.body;

    if (!username || !email || !password || !phone || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const values = [username, email, password, phone, role];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to signup' });
        }

        const mailOption = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome To liver Disease App',
            text: `Hello ${username}, \n\nYour account has been created successfully.\n\nBest Regards,\nYour email password ${password}`
        };

        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send email' });
            }
            console.log('Email sent:', info.response);
        });

        console.log('Registration successful:', result);
        res.status(200).json({ message: 'Registration successful' });
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = "SELECT * FROM nast WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Assuming only one user will be returned for the given email and password
        const user = results[0];
        res.status(200).json({ message: 'Login successful', role: user.role });
    });
});
// Endpoint to handle GET requests for table data
app.get('/admin', (req, res) => {
    const sql = "SELECT * FROM nast";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to retrieve data' });
        }
        res.status(200).json(results);
    });
});

// Endpoint to handle DELETE requests
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM nast WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to delete item' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    });
});

// Endpoint to handle PUT requests for updating user data
app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password, phone, role } = req.body;

    const sql = "UPDATE nast SET username = ?, email = ?, password = ?, phone = ?, role = ? WHERE id = ?";
    const values = [username, email, password, phone, role, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to update item' });
        }
        res.status(200).json({ message: 'Item updated successfully' });
    });
});

const PORT = process.env.PORT || 8082; // Changed port to avoid conflict
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

