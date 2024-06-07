const app = require('express')();
const PORT = 5000;

require('dotenv').config()
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get("/games", (req, res) => {
    fs.readFile('games.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }
        const games = JSON.parse(data);
        res.json(games);
    });
});

app.post("/games", (req, res) => {
    validateToken(req, res, () => {
        res.json({ message: 'Game created' });
    });
    // const { id } = req.params;
    // const { streamId, timestamp } = req.body;

    // if(!id) res.status(400).send("Match ID is required");
    // if(!streamId) res.status(400).send("Stream ID is required");
    // if(!timestamp) res.status(400).send("Timestamp is required");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});