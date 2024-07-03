const socket = io();

const hostGameCode = localStorage.getItem('gameID'); 

let time = 15; // 3 minutes in seconds
let timerInterval;

const resetBtn = document.querySelector("#reset-game");

const min = document.getElementById('minutes');
const sec = document.getElementById('seconds');

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    min.textContent = String(minutes).padStart(2, '0');
    sec.textContent = String(seconds).padStart(2, '0');

    if (time > 0) {
        time--;
    } else {
        clearInterval(timerInterval);
        socket.emit('roundEnd', hostGameCode, '');
    }
}
if (timerInterval) {
    clearInterval(timerInterval);
}
timerInterval = setInterval(updateTimer, 1000);
resetBtn.hidden = false;

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    time = 180;
    min.textContent = '03';
    sec.textContent = '00';
    timerInterval = setInterval(updateTimer, 1000);
});
