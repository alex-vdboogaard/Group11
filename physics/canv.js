// const canvasMaze = document.getElementById("maze");
// const ctxMaze = canvasMaze.getContext("2d");
// const balls = canvasMaze.cloneNode();
// const ctx = balls.getContext("2d");
// const canvas = document.getElementById("balls");
// const ctx = canvas.getContext("2d");

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
        console.log(value);
        element.style[topOrLeft] = (Number(value) + distance) + "px";
    }
}

var ball = document.getElementById("ball");


let t = 1.0;
let gravity = 3000;
let bounciness = 2 / 10;
const RADIUS = 10;

let x0 = 110;
let y0 = 110;
let xf = 110;
let yf = 110;

let v0x = 0;
let v0y = 0;
let vfx = 0;
let vfy = 0;

let ax = 0;
let ay = 0;

let b = 0;
let g = 0;

ctx.beginPath();
ctx.arc(10, 10, RADIUS, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill();
ctx.strokeStyle = "black";
ctx.stroke();


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
        console.log("not iOS");
        window.addEventListener('deviceorientation', handleOrientation)
    } else {
        //not supported
        alert('not supported')
    }
}




function moving() {
    // ctx.clearRect(0, 0, balls.width, balls.height);

    ax = gravity * Math.sin(g * Math.PI / 180);
    ay = gravity * Math.sin(b * Math.PI / 180);

    vfx = v0x + ax * t / 1000.0;
    vfy = v0y + ay * t / 1000.0;

    xf = x0 + v0x * t / 1000.0 + 0.5 * ax * (t / 1000) ** 2;
    yf = y0 + v0y * t / 1000.0 + 0.5 * ay * (t / 1000) ** 2;


    if (xf < RADIUS + 100) {
        xf = RADIUS + 100;
        vfx = -vfx * bounciness;
    } else if (xf > canvasMaze.width - RADIUS + 100) {
        xf = canvasMaze.width - RADIUS + 100;
        vfx = -vfx * bounciness;
    }
    if (yf < RADIUS + 100) {
        yf = RADIUS + 100;
        vfy = -vfy * bounciness;
    } else if (yf > canvasMaze.height - RADIUS + 100) {
        yf = canvasMaze.height - RADIUS + 100;
        vfy = -vfy * bounciness;
    }

    console.log("Here");
    console.log(xf);
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

    // ctx.beginPath();
    // ctx.arc(xf, yf, RADIUS, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.strokeStyle = "black";
    // ctx.stroke();

    // console.log("Here");
    // console.log(deltaX);
    // console.log(g); 
}

setInterval(moving, t);