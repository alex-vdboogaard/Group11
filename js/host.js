const socket = io();
const createGameBtn = document.getElementById("createGameBtn");
const gameIDContainer = document.getElementById("gameIDContainer");
const gameIDSpan = document.getElementById("gameID");

createGameBtn.addEventListener("click", () => {
    // alert('clicked button');
    socket.emit("createGame");
});

socket.on("gameCreated", ({ gameID }) => {
    gameIDContainer.style.display = "block";
    gameIDSpan.textContent = gameID;
    createGameBtn.style.display = "none";
});

socket.on("playerJoined", ({ username }) => {
    alert(`${username} has joined your game!`);
});