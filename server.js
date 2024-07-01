const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
//****************************************************************************************
// global variables

// arr of all active sessions' gameIDs stored in an array
var gamesInSession = []; 

//****************************************************************************************
//middleware
app.use(express.static(__dirname));

app.use(express.json());
//****************************************************************************************
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});
//****************************************************************************************
app.post('/', (req, res) => {

    const game = gamesInSession.find(gameObj => gameObj.gameID === req.body.gameID);

    if (!req.body.username)
    {
        //Errormessage
        res.json({"Status" : "Error", "Message" : "You have to put in a username"});
        return;
    }
    else if (!req.body.gameID)
    {
        //Errormessage
        res.json({"Status" : "Error", "Message" : "You have to put in a gameID"});
        return;
    }
    else if (game && game.users.some(user => user.username === req.body.username))
    {
        //Errormessage
        res.json({"Status" : "Error", "Message" : "Username already exists"});
        return;
    }
    else if (game && game.users.length >= 4)
    {
        //Errormessage
        res.json({"Status" : "Error", "Message" : "This game is already full."});
        return;
    }

    // add some additional checking here

    res.json({"Status" : "Success"});
    return;
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
        console.log(gamesInSession);
        gamesInSession.push({"gameID": gameID, "users": [], "round": 0});
        console.log(gamesInSession);
    });

    // allow players to join a game based on gameID
    socket.on('joinGame', ({ username, gameID }) => {
        socket.join(gameID);
        // console.log(users);
        // users.set(username, socket.id);
        // console.log(users);

        console.log(gamesInSession);
        const game = gamesInSession.find(gameObj => gameObj.gameID === gameID);
        console.log(game.users);
        if (game) {
            game.users.push({"username": username, "score": 0});
        }
        console.log(gamesInSession);
        console.log(game.users);


        io.to(gameID).emit('playerJoined', { username });
        console.log(`${username} joined game ${gameID}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
//****************************************************************************************
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
//****************************************************************************************