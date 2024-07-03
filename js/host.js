const canvasMaze = document.getElementById('maze');
const ctxMaze = canvasMaze.getContext('2d');

function closeAllPop() {
    document.querySelectorAll(".pop").forEach(pop => { pop.remove(); });
}

//this makes the popup move up out of the screen then disappear
function delayedRemove() {
    const popElements = document.querySelectorAll(".pop");
    setTimeout(function () {
        popElements.forEach(pop => {
            pop.style.transition = "margin-top 0.5s ease-out";
            pop.style.marginTop = "-80px";
            pop.addEventListener("transitionend", function () {
                pop.remove();
            }, { once: true });
        });
    }, 3000);
}

const simplePop = (type, message, position = "top") => {
    closeAllPop();
    if (type === "success") type = "pop-success";
    if (type === "error") type = "pop-error";
    const body = document.querySelector("body");
    const alert = document.createElement("div");
    alert.classList.add("pop-top", "pop", type);

    if (type === "pop-success") {
        alert.innerHTML = `<svg class="pop-svg" style="margin-right:15px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7L10 17L5 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>${message}</p>`;
    }
    else {
        alert.innerHTML = `<svg style="margin-right:15px" class="pop-svg" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2287_12)">
        <path d="M45 0C20.1445 0 0 20.1445 0 45C0 69.8555 20.1445 90 45 90C69.8555 90 90 69.8555 90 45C90 20.1445 69.8555 0 45 0ZM11.25 45C11.25 26.3496 26.3672 11.25 45 11.25C52.4004 11.25 59.2383 13.6582 64.793 17.7012L17.7012 64.793C13.6582 59.2383 11.25 52.4004 11.25 45ZM45 78.75C37.5996 78.75 30.7617 76.3418 25.207 72.2988L72.2988 25.207C76.3418 30.7793 78.75 37.5996 78.75 45C78.75 63.6504 63.6328 78.75 45 78.75Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_2287_12">
        <rect width="90" height="90" fill="white"/>
        </clipPath>
        </defs>
        </svg><p>${message}</p>`;
    }

    body.appendChild(alert);

    setTimeout(function () {
        alert.style.transition = "top 0.5s ease-out";
        alert.style.top = "10px";
    }, 100);

    delayedRemove();
}

const socket = io();
let username1 = "";
let username2 = "";

// for /gamehost
const HostBtn = document.getElementById("HostBtn");
const gameIDContainer = document.getElementById("gameIDContainer");
const gameIDSpan = document.getElementById("gameID");

// on the initial render of the page....
(function () {
    socket.emit("createGame");
})();

socket.on("gameCreated", ({ gameID }) => {
    gameIDSpan.textContent = gameID;
});

socket.on("playerJoined", ({ username }) => {
    // alert(`${username} has joined your game!`);
    simplePop("success", `${username} has joined your game!`);
    if (!username1) {
        username1 = username;
    }
    else {
        username2 = username;
    }
});

socket.on("receiveUpdate", ({ ctx }) => {
    document.querySelectorAll("canvas").remove();
    document.querySelector("main").appendChild(ctx);
})

socket.on("startHosting", () => {
    // add logic here - like making a start game button visible
    // alert('The game may start');
    simplePop("success", `The game may start`);
    HostBtn.style.display = "block";
});



HostBtn.addEventListener('click', () => {
    // start the game and host moves to a new screen
    alert("Works");
    console.log("HIII");
    socket.emit('startGame', document.getElementById("gameID").textContent);
    localStorage.setItem('gameID', document.getElementById("gameID").textContent);
    localStorage.setItem('user1', username1);
    localStorage.setItem('user2', username2);
    window.location.href = '/host';
    // hostGameCode.innerHTML = document.getElementById("gameID").textContent;
});

//receive updated positions of balls:
socket.on("updateBalls", ({ player1 }) => {
    const player1Ball = document.querySelector("#ball1");
    player1Ball.left = player1.x;
    player1Ball.top = player1.y;
})

// socket.on("startGame", ({ maze }) => {
//     console.log(maze);
// })




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
        move(ball, "left", -1 * deltaX);
    }
    else {
        move(ball, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ball, "up", -1 * deltaY);
    }
    else {
        move(ball, "down", deltaY);
    }

    x0 = tx;
    y0 = ty;

    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.arc(x0, y0, 10, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.stroke();
}


socket.on('startGameForPlayers', (maze2) => {
    console.log("Maze: ", maze2);
    maze = maze2;
    makeMaze();
    // window.location.href = '/play';
    document.getElementById("map").style.display = 'block';
    document.getElementById("join-game-main").style.display = 'none';
})