const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let t = 10.0;

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
ctx.arc(xf, yf, 10, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill();
ctx.stroke();



function handleOrientation(event) {
    let alpha = event.alpha
    let beta = event.beta
    let gamma = event.gamma

    b = beta
    g = gamma

    if (b > 60) {
        b = 60
    }
    else if (b < -60) {
        b = -60
    }
    if (g > 60) {
        g = 60
    }
    else if (g < -60) {
        g = -60
    }
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

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 500, 500);

    ax = 10 * Math.sin(g);
    ay = 10 * Math.sin(b);

    vfx = v0x + ax * t / 1000.0;
    vfy = v0y + ay * t / 1000.0;

    xf = x0 + v0x * t / 1000.0 + 0.5 * ax * (t / 1000) ** 2;
    yf = y0 + v0y * t / 1000.0 + 0.5 * ay * (t / 1000) ** 2;

    v0x = vfx;
    v0y = vfy;
    x0 = xf;
    y0 = yf;

    ctx.beginPath();
    ctx.arc(xf, yf, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();

    console.log(g);
    // console.log(g); 
}

setInterval(moving, t);