const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let t = 1.0;
let speed = 1000;
let bounciness = 2 / 10;
const RADIUS = 10;

let targetx = 50;
let targety = 50;

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

ctx.beginPath();
ctx.arc(xf, yf, 10, 0, 2 * Math.PI); //make the circle at x,y
ctx.arc(targetx, targety, 10, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill();
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

    // ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, 500, 500);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(x0 - RADIUS, y0 - RADIUS, x0 + RADIUS, y0 + RADIUS);
    // ctx.clearRect(x0 - RADIUS, y0 - RADIUS, RADIUS * 2, RADIUS * 2);
    // ctx.beginPath();
    // ctx.arc(x0, y0, RADIUS, 0, 2 * Math.PI);
    // // ctx.fillStyle = "white";
    // ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
    // ctx.fill();
    // ctx.strokeStyle = "white";
    // ctx.stroke();

    ax = speed * Math.sin(g * Math.PI / 180);
    ay = speed * Math.sin(b * Math.PI / 180);

    vfx = v0x + ax * t / 1000.0;
    vfy = v0y + ay * t / 1000.0;
    ///////////////////////////////////////////////////////////////////////////////// send positions to server
    xf = x0 + v0x * t / 1000.0 + 0.5 * ax * (t / 1000) ** 2;
    yf = y0 + v0y * t / 1000.0 + 0.5 * ay * (t / 1000) ** 2;

    if (xf >= targetx - 40 && xf <= targetx + 40) {
        if (yf >= targety - 40 && yf <= targety + 40) {
            alert("You win");
        }
    }

    if (xf < RADIUS) {
        xf = RADIUS;
        vfx = -vfx * bounciness;
    } else if (xf > canvas.width - RADIUS) {
        xf = canvas.width - RADIUS;
        vfx = -vfx * bounciness;
    }
    if (yf < RADIUS) {
        yf = RADIUS;
        vfy = -vfy * bounciness;
    } else if (yf > canvas.height - RADIUS) {
        yf = canvas.height - RADIUS;
        vfy = -vfy * bounciness;
    }

    v0x = vfx;
    v0y = vfy;
    x0 = xf;
    y0 = yf;

    ctx.beginPath();
    ctx.arc(xf, yf, RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    // ctx.fillStyle = "rgba(0, 0, 255, 1.0)";
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.arc(targety, targety, RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    console.log(vfx);
    // console.log(g); 
}

setInterval(moving, t);