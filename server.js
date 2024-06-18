require('dotenv').config({ path: '.env.local' })
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bodyParser = require('body-parser');
const { tryAddGame } = require('./games');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(process.env.ENV != 'development') {
    app.use(express.static(
        path.resolve(__dirname, 'dist'),
        { maxAge: '1y', etag: false},
    ));
}
    
// Authorization

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const validateToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

app.post('/api/login', (req, res) => {
    const password = req.body.password;
    if (password === process.env.ADMIN_PASSWORD) {
        const token = generateToken({ user: 'admin' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
});

// Games

app.get("/api/games", async (req, res) => {

    fs.readFile('games.json', 'utf8', async (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }
        const games = JSON.parse(data);
        res.json(games);
    });
});

app.post("/api/games", async (req, res) => {
    validateToken(req, res, async () => {
        const gameQuery = req.body;
    
        if(!gameQuery.matchId) {
            res.status(400).json({ error: "Match ID is required" });
            return;
        }
        if(!gameQuery.streamId) {
            res.status(400).json({ error: "Stream ID is required" });
            return;
        }
        if(!gameQuery.timestamp) {
            res.status(400).json({ error: "Timestamp is required" });
            return;
        }

        const game = await tryAddGame(gameQuery);
        res.send(game);
    });
});

if(process.env.ENV != 'development') {
    app.get("*", () => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});