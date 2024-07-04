const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

let maze;

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
function rand(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function Maze(Width, Height) {
    //console.log("Maze");
    var mazeMap;
    var width = Width;
    var height = Height;
    var startCoord, endCoord;
    var dirs = ["n", "s", "e", "w"];
    var modDir = {
        n: {
            y: -1,
            x: 0,
            o: "s"
        },
        s: {
            y: 1,
            x: 0,
            o: "n"
        },
        e: {
            y: 0,
            x: 1,
            o: "w"
        },
        w: {
            y: 0,
            x: -1,
            o: "e"
        }
    };

    this.map = function () {
        return mazeMap;
    };
    this.startCoord = function () {
        return startCoord;
    };
    this.endCoord = function () {
        return endCoord;
    };

    function genMap() {
        mazeMap = new Array(height);
        for (y = 0; y < height; y++) {
            mazeMap[y] = new Array(width);
            for (x = 0; x < width; ++x) {
                mazeMap[y][x] = {
                    n: false,
                    s: false,
                    e: false,
                    w: false,
                    visited: false,
                    priorPos: null
                };
            }
        }
    }

    function defineMaze() {
        var isComp = false;
        var move = false;
        var cellsVisited = 1;
        var numLoops = 0;
        var maxLoops = 0;
        var pos = {
            x: 0,
            y: 0
        };
        var numCells = width * height;
        while (!isComp) {
            move = false;
            mazeMap[pos.x][pos.y].visited = true;

            if (numLoops >= maxLoops) {
                shuffle(dirs);
                maxLoops = Math.round(rand(height / 8));
                numLoops = 0;
            }
            numLoops++;
            for (index = 0; index < dirs.length; index++) {
                var direction = dirs[index];
                var nx = pos.x + modDir[direction].x;
                var ny = pos.y + modDir[direction].y;

                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    //Check if the tile is already visited
                    if (!mazeMap[nx][ny].visited) {
                        //Carve through walls from this tile to next
                        mazeMap[pos.x][pos.y][direction] = true;
                        mazeMap[nx][ny][modDir[direction].o] = true;

                        //Set Currentcell as next cells Prior visited
                        mazeMap[nx][ny].priorPos = pos;
                        //Update Cell position to newly visited location
                        pos = {
                            x: nx,
                            y: ny
                        };
                        cellsVisited++;
                        //Recursively call this method on the next tile
                        move = true;
                        break;
                    }
                }
            }

            if (!move) {
                //  If it failed to find a direction,
                //  move the current position back to the prior cell and Recall the method.
                pos = mazeMap[pos.x][pos.y].priorPos;
            }
            if (numCells == cellsVisited) {
                isComp = true;
            }
        }
    }

    function defineStartEnd() {
        switch (rand(4)) {
            case 0:
                startCoord = {
                    x: 0,
                    y: 0
                };
                endCoord = {
                    x: height - 1,
                    y: width - 1
                };
                break;
            case 1:
                startCoord = {
                    x: 0,
                    y: width - 1
                };
                endCoord = {
                    x: height - 1,
                    y: 0
                };
                break;
            case 2:
                startCoord = {
                    x: height - 1,
                    y: 0
                };
                endCoord = {
                    x: 0,
                    y: width - 1
                };
                break;
            case 3:
                startCoord = {
                    x: height - 1,
                    y: width - 1
                };
                endCoord = {
                    x: 0,
                    y: 0
                };
                break;
        }
    }

    genMap();
    defineStartEnd();
    defineMaze();
}



//****************************************************************************************
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('hostConnected', (gameID) => {
        const game = gamesInSession.find(gameObj => gameObj.gameID === gameID);
        if (game) {
            game.game_socket = socket;
            console.log(game, socket.id);
            // (game.game_socket).emit('startGameForHost', game.maze);
            // io.to(game.game_socket.id).to('startGameForHost', game.maze);
            socket.emit('startGameForHost', game.maze);
        }
    });

    // create a new game on the game host
    // we want to be able to display the gameID on the game host UI 
    socket.on('createGame', () => {
        const gameID = generateGameID();
        console.log('created a game');
        socket.join(gameID);
        socket.emit('gameCreated', { gameID });
        console.log('Game created with a id of: ', gameID);
        console.log(gamesInSession);
        gamesInSession.push({ "gameID": gameID, "game_socket": {}, "maze": {}, "users": [], "round": 0 });
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
        maze = new Maze(10, 10);
        let myMaze = { map: maze.map(), startCoord: maze.startCoord(), endCoord: maze.endCoord() };
        console.log('AAAAAAAAAAAAAA', myMaze);
        io.to(gameID).emit('startGameForPlayers', myMaze);

        // display maze on the host
        let game = gamesInSession.find(gameObj => gameObj.gameID === gameID);
        if (game) {
            console.log("HOST", game)
            game.maze =  myMaze;
            // game.game_socket.emit('startGameForHost', myMaze);
        }
    })


    socket.on('timeUp', (gameID) => {
        //increment round
        let game = gamesInSession.find(el => el.gameID === gameID);
        game.round += 1;
        io.to(gameID).emit('resetGame', (game))
    })

    socket.on('Won', (gameID) => {
        console.log('WONNNNN', gameID);
        let game = gamesInSession.find(el => el.gameID === gameID);
        if (game) {
            (game.game_socket).emit('winner');
        }
    });

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