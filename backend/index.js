const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Import sqlite3
const cors = require('cors');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executePy');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbPath = path.resolve('/temp/database.db');


// Initialize SQLite database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        console.log("Connected to the SQLite database.");

        // Create tables if they don't exist
        db.run(`CREATE TABLE IF NOT EXISTS login (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            date TEXT,
            description TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS problems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            topic TEXT,
            title TEXT,
            statement TEXT,
            input TEXT,
            output TEXT,
            solution TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS quiz (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            topic TEXT,
            question TEXT,
            option1 TEXT,
            option2 TEXT,
            option3 TEXT,
            option4 TEXT,
            answer TEXT
        )`);
    }
});

// Code Compiler API
app.post('/run' , async (req,res) => {
    const {language  ,code} = req.body;
    console.log(language,code.length);
    if(code === undefined){
        return res.status(400).json({success : false , error : "Empty code body!" });
    }

    try {

       
    const filepath = await generateFile(language , code);

    let output;

    if(language === "cpp"){
         output = await executeCpp(filepath);
    } else{ 
        output  = await executePy(filepath);
    }

   
    return res.json({filepath, output});}
    catch(err){
        res.status(500).json({err});
    }
});

// Signup API
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const { name, email, password } = req.body;

    db.run(sql, [name, email, password], function (err) {
        if (err) {
            console.error(err.message);
            return res.json("Error");
        }
        return res.json({ id: this.lastID });
    });
});

// Login API
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    const { email, password } = req.body;

    db.get(sql, [email, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.json("Error");
        }
        if (row) {
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    });
});

// Add Blogs API
app.post("/addblogs", (req, res) => {
    const sql = "INSERT INTO blogs (username, date, description) VALUES (?, ?, ?)";
    const { username, date, description } = req.body;

    db.run(sql, [username, date, description], function (err) {
        if (err) {
            console.error(err.message);
            return res.json("Error");
        }
        return res.json({ id: this.lastID });
    });
});

// Delete Blog API
app.delete("/deleteblog", (req, res) => {
    const sql = "DELETE FROM blogs WHERE id = ?";
    const blogId = req.body.id;  

    db.run(sql, [blogId], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Error deleting blog" });
        }
        return res.json({ message: "Successfully deleted", changes: this.changes });
    });
});


// Get Problems API
app.get('/problems', (req, res) => {
    const sql = "SELECT * FROM problems";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(rows);
    });
});

// Get Problem by ID API
app.get('/problems/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM problems WHERE id = ?";
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (!row) {
            return res.status(404).json({ error: "Problem not found" });
        }
        return res.json([row]); // Return as an array to match the client-side code
    });
});


// Get Quiz API based on topic
app.get('/quiz', (req, res) => {
    const topic = req.query.topic;
    if (!topic) {
        return res.status(400).json({ error: 'Topic query parameter is required' });
    }

    const sql = "SELECT * FROM quiz WHERE topic = ?";
    db.all(sql, [topic], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(rows);
    });
});

// Get Blogs API
app.get('/blogs', (req, res) => {
    const sql = "SELECT * FROM blogs";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.json("Error");
        }
        return res.json(rows);
    });
});
app.get('/', (req, res) => {
    res.send('Hello, Chandusiriyala!');  
});


app.listen(8081, () => {
    console.log("Listening on port 8081");
});
