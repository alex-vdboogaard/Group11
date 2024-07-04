const socket = io();
let intervalID;

simplePop("success", "Game starting...");
    (function () {
        const hostGameCode = document.getElementById("hostGameCode");
        const gameID = localStorage.getItem('gameID');
        const user1 = localStorage.getItem('user1');
        const user2 = localStorage.getItem('user2');
        // alert(gameID);
        hostGameCode.innerHTML = `Maze War! - ${gameID}`;
        document.querySelector("#user1").innerHTML = user1;
        document.querySelector("#user2").innerHTML = user2;


        socket.emit('hostConnected', gameID);

        
        socket.on('startGameForHost', (maze2) => {
            // alert(socket.id);
            console.log("Maze: ", maze2);
            maze = maze2;
            makeMaze();
            
        })
    })();

    socket.on('winner', () => {
        simplePop("success", "There was a winner");
        socket.emit('startGame', localStorage.getItem('gameID'));
    })

const canvasMaze = document.getElementById('maze');
const ctxMaze = canvasMaze.getContext('2d');
const canvasOne = document.getElementById('ball1');
const canvasTwo = document.getElementById('ball2');
const ctxOne = canvasOne.getContext('2d');
const ctxTwo = canvasTwo.getContext('2d');


function move(element, direction, distance = 0) {
    if (distance != 0) {
        var topOrLeft = (direction == "left" || direction == "right") ? "left" : "top";
        if (direction == "up" || direction == "left") { distance *= -1; }
        var elStyle = window.getComputedStyle(element);
        var value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
        // console.log(value);
        element.style[topOrLeft] = (Number(value) + distance) + "px";
    }
}

var ballOne = document.getElementById("ballOne");
var ballTwo = document.getElementById("ballTwo");

// let closest = [-1, -1];

let t = 1.0;
let gravity = 3000;
let bounciness = 2 / 10;
const RADIUS = 10;

let x0 = 110;
let y0 = 110;
let xf = 110;
let yf = 110;
let targetx = 0;
let targety = 0;

let v0x = 0;
let v0y = 0;
let vfx = 0;
let vfy = 0;

let ax = 0;
let ay = 0;

let b = 0;
let g = 0;

let maze;
let draw;
let cellSize;


let zone;

function first() {
    // if (localStorage.getItem('user1'))
    ctxOne.beginPath();
    ctxOne.lineWidth = 1;
    ctxOne.arc(15, 15, 10, 0, 2 * Math.PI);
    ctxOne.fillStyle = "red";
    ctxOne.fill();
    ctxOne.stroke();

    ctxTwo.beginPath();
    ctxTwo.lineWidth = 1;
    ctxTwo.arc(15, 15, 10, 0, 2 * Math.PI);
    ctxTwo.fillStyle = "blue";
    ctxTwo.fill();
    ctxTwo.stroke();


    zone = new Array(canvasMaze.height + 1);
    for (let i = 0; i < canvasMaze.height + 1; i++) {
        zone[i] = new Array(canvasMaze.width + 1).fill(0);
    }
}
first()


function handleOrientation(event) {
    let beta = event.beta
    let gamma = event.gamma

    b = beta
    g = gamma

    b = Math.min(Math.max(beta, -60), 60);
    g = Math.min(Math.max(gamma, -60), 60);
}



async function requestDeviceOrientation() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        //iOS 13+ devices
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission()
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation)
            } else {
                alert('Permission was denied')
            }
        } catch (error) {
            alert(error)
        }
    } else if ('DeviceOrientationEvent' in window) {
        //non iOS 13+ devices
        //console.log("not iOS");
        window.addEventListener('deviceorientation', handleOrientation)
    } else {
        //not supported
        alert('not supported')
    }
}
////////////////////////////////////////////////////////


function DrawMaze(Maze, ctx, cellsize) {
    //console.log("DrawMaze");
    var map = Maze.map();
    var cellSize = cellsize;
    var drawEndMethod;
    ctx.lineWidth = 2;

    this.redrawMaze = function (size) {
        cellSize = size;
        //ctx.lineWidth = cellSize / 50;
        drawMap();
        drawEndMethod();
    };

    function drawCell(xCord, yCord, cell) {
        var x = xCord * cellSize;
        var y = yCord * cellSize;

        if (cell.n == false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y);
            ctx.stroke();

            for (let i = x; i < x + cellSize; i++) {
                //console.log(i + " " + y);
                zone[i][y] = -1;
            }
        }
        if (cell.s === false) {
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();

            for (let i = x; i < x + cellSize; i++) {
                //console.log(i + " " + y + cellSize);
                zone[i][y + cellSize] = -1;
            }
        }
        if (cell.e === false) {
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();

            for (let i = y; i < y + cellSize; i++) {
                //console.log(x + cellSize + " " + i);
                zone[x + cellSize][i] = -1;
            }
        }
        if (cell.w === false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.stroke();

            for (let i = y; i < y + cellSize; i++) {
                //console.log(x + " " + i);
                zone[x][i] = -1;
            }
        }
    }

    function drawMap() {
        for (x = 0; x < map.length; x++) {
            for (y = 0; y < map[x].length; y++) {
                drawCell(x, y, map[x][y]);
            }
        }
    }

    function drawEndFlag() {
        var coord = Maze.endCoord;
        var gridSize = 4;
        var fraction = cellSize / gridSize - 2;
        var colorSwap = true;
        for (let y = 0; y < gridSize; y++) {
            if (gridSize % 2 == 0) {
                colorSwap = !colorSwap;
            }
            for (let x = 0; x < gridSize; x++) {
                ctx.beginPath();
                ctx.rect(
                    coord.x * cellSize + x * fraction + 4.5,
                    coord.y * cellSize + y * fraction + 4.5,
                    fraction,
                    fraction
                );
                if (colorSwap) {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                } else {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                }
                ctx.fill();
                colorSwap = !colorSwap;
            }
        }
    }

    function clear() {
        var canvasSize = cellSize * map.length;
        ctx.clearRect(0, 0, canvasSize, canvasSize);
    }

    drawEndMethod = drawEndFlag;
    clear();
    drawMap();
    drawEndMethod();
}


function makeMaze() {
    //console.log("makeMaze");
    difficulty = 10
    cellSize = canvasMaze.width / difficulty;

    zone = new Array(canvasMaze.height + 1);
    for (let i = 0; i < canvasMaze.height + 1; i++) {
        zone[i] = new Array(canvasMaze.width + 1).fill(0);
    }
    draw = new DrawMaze(maze, ctxMaze, cellSize);

    tx = maze.startCoord.x * cellSize + cellSize / 2;
    ty = maze.startCoord.y * cellSize + cellSize / 2;

    targetx = maze.endCoord.x * cellSize;
    targety = maze.endCoord.y * cellSize;

    xf = tx;
    yf = ty;

    deltaX = xf - x0 + 95;
    deltaY = yf - y0 + 95;

    if (deltaX < 0) {
        move(ballOne, "left", -1 * deltaX);
    }
    else {
        move(ballOne, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ballOne, "up", -1 * deltaY);
    }
    else {
        move(ballOne, "down", deltaY);
    }

    if (deltaX < 0) {
        move(ballTwo, "left", -1 * deltaX);
    }
    else {
        move(ballTwo, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ballTwo, "up", -1 * deltaY);
    }
    else {
        move(ballTwo, "down", deltaY);
    }

    x0 = tx;
    y0 = ty;


}


/////////////////////////////////////////////////////////


function collided(xff, yff) {
    xff = Math.floor(xff);
    yff = Math.floor(yff);

    // closest = [-1, -1];
    // console.log(xff);
    // let disclosest = 1000000;

    for (let i = xff - RADIUS; i <= xff + RADIUS; i++) {
        for (let j = yff - RADIUS; j <= yff + RADIUS; j++) {

            let dis = ((xff - i) ** 2) + ((yff - j) ** 2)
            if (dis <= RADIUS ** 2) {
                // console.log(i);
                if (zone[i][j] == -1) {

                    // if (dis < disclosest){
                    //     disclosest = dis;
                    //     closest = [i, j];
                    //     // console.log(closest[1]);
                    // }
                    return true;
                }
            }
        }
    }
    // return closest;
    return false;
}


///////////////////////////////////////////////////////

function moving() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw = new DrawMaze(maze, ctxMaze, cellSize);

    ax = gravity * Math.sin(g * Math.PI / 180);
    ay = gravity * Math.sin(b * Math.PI / 180);

    vfx = v0x + ax * t / 1000.0;
    vfy = v0y + ay * t / 1000.0;
    ///////////////////////////////////////////////////////////////////////////////// send positions to server
    xf = x0 + v0x * t / 1000.0 + 0.5 * ax * (t / 1000) ** 2;
    yf = y0 + v0y * t / 1000.0 + 0.5 * ay * (t / 1000) ** 2;


    let collisionx = collided(xf, y0);
    let collisiony = collided(x0, yf);
    let collisionxy = collided(xf, yf);

    if (collisionx && !collisiony) {
        xf = x0;
        vfx = -vfx * bounciness;
    }
    else if (!collisionx && collisiony) {
        yf = y0;
        vfy = -vfy * bounciness;
    }
    else if (collisionxy) {
        xf = x0;
        yf = y0;
        let temp = vfx;
        vfx = -Math.sign(vfx) * Math.abs(vfy) * bounciness;
        vfy = -Math.sign(vfy) * Math.abs(temp) * bounciness;
    }
    deltaX = xf - x0;
    deltaY = yf - y0;
    if (deltaX < 0) {
        move(ballOne, "left", -1 * deltaX);
    }
    else {
        move(ballOne, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ballOne, "up", -1 * deltaY);
    }
    else {
        move(ballOne, "down", deltaY);
    }

    if (deltaX < 0) {
        move(ballTwo, "left", -1 * deltaX);
    }
    else {
        move(ballTwo, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ballTwo, "up", -1 * deltaY);
    }
    else {
        move(ballTwo, "down", deltaY);
    }

    v0x = vfx;
    v0y = vfy;
    x0 = xf;
    y0 = yf;



    if ((targetx < xf && xf < targetx + cellSize) && (targety < yf && yf < targety + cellSize)) {
        window.alert("Won");
        socket.emit('Won', document.getElementById("gameID").value);
        clearInterval(intervalID);
        return;
    }

    // console.log(g); 
}

intervalID = setInterval(moving, t);

function DrawMaze(Maze, ctx, cellsize) {
    //console.log("DrawMaze");
    var map = Maze.map;
    //var map = Maze[map];
    var cellSize = cellsize;
    var drawEndMethod;
    ctx.lineWidth = 2;

    this.redrawMaze = function (size) {
        cellSize = size;
        //ctx.lineWidth = cellSize / 50;
        drawMap();
        drawEndMethod();
    };

    function drawCell(xCord, yCord, cell) {
        var x = xCord * cellSize;
        var y = yCord * cellSize;

        if (cell.n == false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y);
            ctx.stroke();

            for (let i = x; i < x + cellSize; i++) {
                //console.log(i + " " + y);
                zone[i][y] = -1;
            }
        }
        if (cell.s === false) {
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();

            for (let i = x; i < x + cellSize; i++) {
                //console.log(i + " " + y + cellSize);
                zone[i][y + cellSize] = -1;
            }
        }
        if (cell.e === false) {
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();

            for (let i = y; i < y + cellSize; i++) {
                //console.log(x + cellSize + " " + i);
                zone[x + cellSize][i] = -1;
            }
        }
        if (cell.w === false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.stroke();

            for (let i = y; i < y + cellSize; i++) {
                //console.log(x + " " + i);
                zone[x][i] = -1;
            }
        }
    }

    function drawMap() {
        for (x = 0; x < map.length; x++) {
            for (y = 0; y < map[x].length; y++) {
                drawCell(x, y, map[x][y]);
            }
        }
    }

    function drawEndFlag() {
        var coord = Maze.endCoord;
        var gridSize = 4;
        var fraction = cellSize / gridSize - 2;
        var colorSwap = true;
        for (let y = 0; y < gridSize; y++) {
            if (gridSize % 2 == 0) {
                colorSwap = !colorSwap;
            }
            for (let x = 0; x < gridSize; x++) {
                ctx.beginPath();
                ctx.rect(
                    coord.x * cellSize + x * fraction + 4.5,
                    coord.y * cellSize + y * fraction + 4.5,
                    fraction,
                    fraction
                );
                if (colorSwap) {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                } else {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                }
                ctx.fill();
                colorSwap = !colorSwap;
            }
        }
    }

    function clear() {
        var canvasSize = cellSize * map.length;
        ctx.clearRect(0, 0, canvasSize, canvasSize);
    }

    drawEndMethod = drawEndFlag;
    clear();
    drawMap();
    drawEndMethod();
}


function makeMaze() {
    //console.log("makeMaze");
    difficulty = 10
    cellSize = canvasMaze.width / difficulty;

    zone = new Array(canvasMaze.height + 1);
    for (let i = 0; i < canvasMaze.height + 1; i++) {
        zone[i] = new Array(canvasMaze.width + 1).fill(0);
    }
    draw = new DrawMaze(maze, ctxMaze, cellSize);

    tx = maze.startCoord.x * cellSize + cellSize / 2;
    ty = maze.startCoord.y * cellSize + cellSize / 2;

    targetx = maze.endCoord.x * cellSize;
    targety = maze.endCoord.y * cellSize;

    xf = tx;
    yf = ty;

    deltaX = xf - x0 + 95;
    deltaY = yf - y0 + 95;
    if (deltaX < 0) {
        move(ballOne, "left", -1 * deltaX);
    }
    else {
        move(ballOne, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ballOne, "up", -1 * deltaY);
    }
    else {
        move(ballOne, "down", deltaY);
    }

    if (deltaX < 0) {
        move(ballTwo, "left", -1 * deltaX);
    }
    else {
        move(ballTwo, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ballTwo, "up", -1 * deltaY);
    }
    else {
        move(ballTwo, "down", deltaY);
    }

    x0 = tx;
    y0 = ty;


}

socket.on('changePositionOnHost', (x, y, username) => {
    console.log(x,y);
    console.log(username);

    if (username == localStorage.getItem('user1') )
    {
        if (x < 0) {
            move(ballOne, "left", -1 * x);
        }
        else {
            move(ballOne, "right", x);
        }
        if (y < 0) {
            move(ballOne, "up", -1 * y);
        }
        else {
            move(ballOne, "down", y);
        }
    }
    else {

        if (x < 0) {
            move(ballTwo, "left", -1 * x);
        }
        else {
            move(ballTwo, "right", x);
        }
        if (y < 0) {
            move(ballTwo, "up", -1 * y);
        }
        else {
            move(ballTwo, "down", y);
        }
    }

})