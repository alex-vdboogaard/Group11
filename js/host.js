const socket = io();
const HostBtn = document.getElementById("HostBtn");
const gameIDContainer = document.getElementById("gameIDContainer");
const gameIDSpan = document.getElementById("gameID");

// on the initial render of the page....
(function() {
    socket.emit("createGame");
})();

socket.on("gameCreated", ({ gameID }) => {
    // alert(gameID)
    // gameIDContainer.style.display = "block";
    gameIDSpan.textContent = gameID;
    
});

socket.on("playerJoined", ({ username }) => {
    // alert(`${username} has joined your game!`);
});

socket.on("startGame", () => {
    // add logic here - like making a start game button visible
    alert('The game may start');
    HostBtn.style.display = "block";
})