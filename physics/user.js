// const canvasMaze = document.getElementById("maze");
// const ctxMaze = canvasMaze.getContext("2d");
// const balls = canvasMaze.cloneNode();
// const ctx = balls.getContext("2d");
// const canvas = document.getElementById("balls");
// const ctx = canvas.getContext("2d");
const socket = io();

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

//const socket = io();

const canvasMaze = document.getElementById('maze');
const ctxMaze = canvasMaze.getContext('2d');
const canvas = document.getElementById('ball1');
const ctx = canvas.getContext('2d');

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

var ball = document.getElementById("ball");

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
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(15, 15, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();


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
                // alert('Permission was denied')
                simplePop("error", `Permission was denied`);
            }
        } catch (error) {
            simplePop("error", `${error}`);
            // alert(error);
        }
    } else if ('DeviceOrientationEvent' in window) {
        //non iOS 13+ devices
        //console.log("not iOS");
        window.addEventListener('deviceorientation', handleOrientation)
    } else {
        //not supported
        alert('not supported')
        simplePop("error", `Not supported`);

    }
}
/////////////////////////////////////////////////////////

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
        var coord = Maze.endCoord();
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
    maze = new Maze(difficulty, difficulty);

    zone = new Array(canvasMaze.height + 1);
    for (let i = 0; i < canvasMaze.height + 1; i++) {
        zone[i] = new Array(canvasMaze.width + 1).fill(0);
    }
    draw = new DrawMaze(maze, ctxMaze, cellSize);

    tx = maze.startCoord().x * cellSize + cellSize / 2;
    ty = maze.startCoord().y * cellSize + cellSize / 2;

    targetx = maze.endCoord().x * cellSize;
    targety = maze.endCoord().y * cellSize;

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

makeMaze();

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

    // if (xf >= targetx - 40 && xf <= targetx + 40) {
    //     if (yf >= targety - 40 && yf <= targety + 40) {
    //     }
    // }

    // if (xf < RADIUS) {
    //     xf = RADIUS;
    //     vfx = -vfx * bounciness;
    // } else if (xf > canvas.width - RADIUS) {
    //     xf = canvas.width - RADIUS;
    //     vfx = -vfx * bounciness;
    // }
    // if (yf < RADIUS) {
    //     yf = RADIUS;
    //     vfy = -vfy * bounciness;
    // } else if (yf > canvas.height - RADIUS) {
    //     yf = canvas.height - RADIUS;
    //     vfy = -vfy * bounciness;
    // }

    // collided(xf, yf);

    // if (closest != [-1, -1]){
    //     // console.log("Collided");
    //     // distX = xf - closest[0];
    //     // distY = yf - closest[1];
    //     // let dist = Math.sqrt((distX)**2 + (distY)**2);

    //     // let angX = Math.acos(Math.abs(distX)/dist);
    //     // let angY = Math.asin(Math.abs(distY)/dist);

    //     // xf = x0 + distX;
    //     // yf = y0 + distY;

    //     // vfx = -vfx * bounciness * Math.abs(angX);
    //     // vfy = -vfy * bounciness * Math.abs(angY);

    // }

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





    // console.log("Here");
    // console.log(xf);
    deltaX = xf - x0;
    deltaY = yf - y0;
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

    v0x = vfx;
    v0y = vfy;
    x0 = xf;
    y0 = yf;

    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.arc(xf, yf, RADIUS, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(xf, yf, RADIUS, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // // ctx.fillStyle = "rgba(0, 0, 255, 1.0)";
    // ctx.fill();

    //socket.emit("updateHost", { ctx });

    if ((targetx < xf && xf < targetx + cellSize) && (targety < yf && yf < targety + cellSize)) {
        window.alert("Won");
        simplePop('success', 'Won');

        socket.emit('roundEnd', {});
    }


    // console.log(g); 
}
socket.on("roundEndPlayers", () => {
    simplePop("success", "A player won, maze restarted!")
    makeMaze();
})

setInterval(moving, t);


//moving()







