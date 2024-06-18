require('dotenv').config({ path: '.env.local' })
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { tryAddGame } = require('./games');
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const mongoUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@dekarsdojo.bjfggtd.mongodb.net/?retryWrites=true&w=majority&appName=DekarsDojo`;
const mongoClient = new MongoClient(mongoUrl);

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

app.get('/api/validate', (req, res) => {
    validateToken(req, res, () => {
        res.json({ message: 'Valid token' });
    });
});

// Games

app.get("/api/games", async (req, res) => {
    await mongoClient.connect();
    const db = mongoClient.db('DekarsDojoDb');
    const games = await db.collection('Games').find().toArray();
    res.send(games);
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

        await mongoClient.connect();
        const db = mongoClient.db('DekarsDojoDb');
        const games = db.collection('Games');
        const existingGame = await games.findOne({ id: gameQuery.matchId });
        if (existingGame) {
            res.status(400).json({ error: "Game already exists" });
            return;
        }
        const game = await tryAddGame(gameQuery, mongoClient);
        res.send(game);
    });
});

app.delete("/api/games/:id", async (req, res) => {
    validateToken(req, res, async () => {
        await mongoClient.connect();
        const db = mongoClient.db('DekarsDojoDb');
        const games = db.collection('Games');
        await games.deleteOne({ id: req.params.id });
        res.send({ id: req.params.id });
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