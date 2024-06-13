const app = require('express')();
const PORT = 5000;

require('dotenv').config()
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bodyParser = require('body-parser');
const { kill } = require('process');
const { profile } = require('console');
const { tryAddGame } = require('./games');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post('/login', (req, res) => {
    const password = req.body.password;
    if (password === process.env.ADMIN_PASSWORD) {
        const token = generateToken({ user: 'admin' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
});

// Games

app.get("/games", async (req, res) => {

    fs.readFile('games.json', 'utf8', async (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }
        const games = JSON.parse(data);
        res.json(games);
    });
});

app.post("/games", async (req, res) => {
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

    // const gameInfo = await rAPI.matchV5.getMatchById({
    //     cluster: accounts[0].cluster,
    //     matchId: id
    // });
    
    // const game = await constructGame(gameInfo);
    // game.id = id
    // game.streamId = streamId;
    // game.timestamp = timestamp;
    // addGame(game);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});