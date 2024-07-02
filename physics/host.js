const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 250;
let y = 250;
let b = 0;
let g = 0;

ctx.beginPath();
ctx.arc(x, y, 10, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill();
ctx.stroke();



function handleOrientation(event) {
    let alpha = event.alpha
    let beta = event.beta
    let gamma = event.gamma

    b = beta
    g = gamma
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
    ctx.fillRect(0,0, 500,500);

    x += Math.sin(b) * 10
    y += Math.sin(g) * 10

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

setInterval(moving, 100);