const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
//****************************************************************************************
// global variables

// map of all users in the game
var users = new Map();

// arr of all active sessions' gameIDs stored in an array
var gamesInSession = []; 

//****************************************************************************************
//middleware
app.use(express.static(__dirname));
//****************************************************************************************
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});
//****************************************************************************************
app.post('/', (req, res) => {
    console.log('post', req);
});
//****************************************************************************************
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

    // create a new game on the game host
    // we want to be able to display the gameID on the game host UI 
    socket.on('createGame', () => {
        const gameID = generateGameID();
        console.log('created a game');
        socket.join(gameID);
        socket.emit('gameCreated', {gameID});
        console.log('Game created with a id of: ', gameID);
    });

    // allow players to join a game based on gameID
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