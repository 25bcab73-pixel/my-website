const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000; // Fixed Port for Mac
const DB_FILE = 'database.json';

app.post('/save', (req, res) => {
    const newData = req.body;
    let database = [];
    if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        database = content ? JSON.parse(content) : [];
    }
    database.push(newData);
    fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2));
    console.log("📥 Data Saved:", newData);
    res.json({ message: "Data Saved Successfully!" });
});

app.get('/all-data', (req, res) => {
    if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        res.json(content ? JSON.parse(content) : []);
    } else {
        res.json([]);
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));