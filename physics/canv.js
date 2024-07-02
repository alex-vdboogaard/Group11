const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

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

let maze;
let draw;
let cellSize;


let zone;

function first(){
    // ctx.beginPath();
    // ctx.lineWidth = 1;
    // ctx.arc(xf, yf, 10, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.stroke();

    zone = new Array(canvas.height +1);
    for (let i = 0; i < canvas.height +1; i++){
        zone[i] = new Array( canvas.width +1).fill(0);
    }
}
//first()


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

    this.map = function() {
        return mazeMap;
    };
    this.startCoord = function() {
        return startCoord;
    };
    this.endCoord = function() {
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
  
    this.redrawMaze = function(size) {
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

            for (let i = x; i < x + cellSize; i++){
                //console.log(i + " " + y);
                zone[i][y] = -1;
            }
        }
        if (cell.s === false) {
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
            
            for (let i = x; i < x + cellSize; i++){
                //console.log(i + " " + y + cellSize);
                zone[i][y + cellSize] = -1;
            }
        }
        if (cell.e === false) {
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
            
            for (let i = y; i < y + cellSize; i++){
                //console.log(x + cellSize + " " + i);
                zone[x + cellSize][i] = -1;
            }
        }
        if (cell.w === false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.stroke();
            
            for (let i = y; i < y + cellSize; i++){
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
    cellSize = canvas.width / difficulty;
    maze = new Maze(difficulty, difficulty);

    zone = new Array(canvas.height +1);
    for (let i = 0; i < canvas.height +1; i++){
        zone[i] = new Array( canvas.width +1).fill(0);
    }
    draw = new DrawMaze(maze, ctx, cellSize);

    tx = maze.startCoord().x * cellSize + cellSize / 2
    ty = maze.startCoord().y * cellSize + cellSize / 2
    x0 = tx;
    y0 = ty;
    xf = tx;
    yf = ty;

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x0, y0, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

makeMaze();


/////////////////////////////////////////////////////////


function collided(xf, yf){
    xf = Math.floor(xf);
    yf = Math.floor(yf);
    
    for (let i = xf-RADIUS; i <= xf+RADIUS; i++){
        for (let j = yf-RADIUS; j <= yf+RADIUS; j++){
            
            if (zone[i][j] == -1){
                return true;
            }
        }
    }
    return false;
}


///////////////////////////////////////////////////////

function moving() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw = new DrawMaze(maze, ctx, cellSize);

    ax = speed * Math.sin(g * Math.PI / 180);
    ay = speed * Math.sin(b * Math.PI / 180);

    vfx = v0x + ax * t / 1000.0;
    vfy = v0y + ay * t / 1000.0;

    xf = x0 + v0x * t / 1000.0 + 0.5 * ax * (t / 1000) ** 2;
    yf = y0 + v0y * t / 1000.0 + 0.5 * ay * (t / 1000) ** 2;


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
    if (collided(xf, yf)){
        vfx = 0;
        vfy = 0;
        xf = x0;
        yf = y0;
    }

    v0x = vfx;
    v0y = vfy;
    x0 = xf;
    y0 = yf;

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(xf, yf, RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

setInterval(moving, t);

//moving()







