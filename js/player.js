const socket = io();
    
const joinForm = document.getElementById("joinForm");

joinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const gameID = document.getElementById("gameID").value;
    
    socket.emit("joinGame", { username, gameID });
});

socket.on("playerJoined", ({ username }) => {
    alert(`${username} has joined the game!`);
});