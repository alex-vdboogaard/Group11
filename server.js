const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
//****************************************************************************************
// global variables
let t = 1.0;
let speed = 1000;
let bounciness = 2 / 10;
const RADIUS = 10;

let x0 = 250;
let y0 = 250;
let xf = 250;
let yf = 250;

let v0x = 0;
let v0y = 0;
let vfx = 0;
let vfy = 0;

let ax = 0;
let ay = 0;

let b = 0;
let g = 0;


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
app.get('/play', (req, res) => {
    res.sendFile(join(__dirname, './physics/user.html'));
});
//****************************************************************************************
app.post('/', (req, res) => {

    const game = gamesInSession.find(gameObj => gameObj.gameID === req.body.gameID);

    if (!req.body.username) {
        //Errormessage
        res.json({ "Status": "Error", "Message": "You have to put in a username" });
        return;
    }
    else if (!gamesInSession.some(game => game.gameID === req.body.gameID)) {
        //Errormessage
        res.json({ "Status": "Error", "Message": "You have to enter a valid gameID" });
        return;
    }
    else if (!req.body.gameID) {
        //Errormessage
        res.json({ "Status": "Error", "Message": "You have to put in a gameID" });
        return;
    }
    else if (game && game.users.some(user => user.username === req.body.username)) {
        //Errormessage
        res.json({ "Status": "Error", "Message": "Username already exists" });
        return;
    }
    else if (game && game.users.length >= 4) {
        //Errormessage
        res.json({ "Status": "Error", "Message": "This game is already full." });
        return;
    }

    // add some additional checking here

    res.json({ "Status": "Success" });
    return;
});
//****************************************************************************************
app.get('/gamehost', (req, res) => {
    res.sendFile(join(__dirname, 'start-session.html'));
});
//****************************************************************************************
app.get('/host', (req, res) => {
    res.sendFile(join(__dirname, './physics/host.html'));
});
//****************************************************************************************
function generateGameID() {
    var charactersToChooseFrom = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = "";
    const charactersLength = charactersToChooseFrom.length;
    for (let i = 0; i < 5; i++) {
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
        socket.emit('gameCreated', { gameID });
        console.log('Game created with a id of: ', gameID);
        console.log(gamesInSession);
        gamesInSession.push({ "gameID": gameID, "users": [], "round": 0 });
        console.log(gamesInSession);
    });

    // allow players to join a game based on gameID
    socket.on('joinGame', ({ username, gameID }) => {
        socket.join(gameID);

        console.log(gamesInSession);
        const game = gamesInSession.find(gameObj => gameObj.gameID === gameID);
        if (game) {
            game.users.push({ "username": username, "score": 0, "socketID": socket.id, "orientation": { "beta": 0, "gamma": 0 } });
        }
        console.log(gamesInSession);
        console.log(game.users);

        io.to(gameID).emit('playerJoined', { username });
        console.log(`${username} joined game ${gameID}`);

        if (game.users.length >= 2 && game.users.length <= 4) {
            io.to(gameID).emit('startHosting');
        }
    });

    socket.on('changeOrientation', ({ username, gameId, beta, gamma }) => {
        var player1 = { "x": 0, "y": 0 };
        var player2 = { "x": 0, "y": 0 };
        io.to(gameId).emit('updateBalls', player1);
    });

    socket.on('startGame', (gameID) => {
        io.to(gameID).emit('startGameForPlayers');
    })

    socket.on('timeUp', (gameID) => {
        //increment round
        let game = gamesInSession.find(el => el.gameID === gameID);
        game.round += 1;
        io.to(gameID).emit('resetGame', (game))
    })

    socket.on('roundEnd', (gameID, winner) => {
        //increment round
        console.log(winner);
        let game = gamesInSession.find(el => el.gameID === gameID);
        if (winner) {
            let winner = game.users.find(el => el.username === winner);
            winner.score += 1;
        }
        game.round += 1;
        io.to(gameID).emit('resetGame', (game))
    })
    socket.on("updateHost", ({ ctx }) => {
        socket.emit("receiveUpdate", ({ ctx }));
    });


    socket.on('disconnecting', () => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                // io.to(room).emit("user has left", socket.id);

                const game = gamesInSession.find(gameObj => gameObj.gameID == room);

                if (game) {
                    // Find the index of the user in the game's users array
                    const userIndex = game.users.findIndex(user => user.socketID == socket.id);
                    if (userIndex !== -1) {
                        // Remove the user from the users array
                        game.users.splice(userIndex, 1);
                    }
                }
            }
        }
    });
});

//****************************************************************************************
server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
//****************************************************************************************