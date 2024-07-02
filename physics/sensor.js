const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let motion = [250,250, 0,0, 0,0]

ctx.beginPath();
ctx.arc(motion[0], motion[1], 10, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill();
ctx.stroke();



function handleOrientation(event) {
    let beta = event.beta
    let gamma = event.gamma

    beta = beta * (Math.PI / 180)
    gamma = gamma * (Math.PI / 180)

    motion[4] = 0.05 * Math.sin(gamma)
    motion[5] = 0.05 * Math.sin(beta)

    console.log(motion[4] + " " + gamma)
    console.log(motion[5] + " " + beta)
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

    motion[2] += motion[4];
    motion[3] += motion[5];

    motion[0] += motion[2];
    motion[1] += motion[3];

    ctx.beginPath();
    ctx.arc(motion[0], motion[1], 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

setInterval(moving, 100);