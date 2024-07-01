const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

//****************************************************************************************
//middleware
app.use(express.static(__dirname));
//****************************************************************************************
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.get('/gamehost', (req, res) => {
    res.sendFile(join(__dirname, 'host.html'));
});
//****************************************************************************************
function generateGameID() {
    var charactersToChooseFrom ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = "";
    const charactersLength = charactersToChooseFrom.length;
    for ( let i = 0; i < 5; i++ ) {
        result += charactersToChooseFrom.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
}
//****************************************************************************************
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('createGame', () => {
        const gameID = generateGameID();
        console.log('created a game');
        socket.join(gameID);
        socket.emit('gameCreated', {gameID});
        console.log('Game created with a id of: ', gameID);
    });

    socket.on('joinGame', ({ username, gameID }) => {
        socket.join(gameID);
        io.to(gameID).emit('playerJoined', { username });
        console.log(`${username} joined game ${gameID}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});