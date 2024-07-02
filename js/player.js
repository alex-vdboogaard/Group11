const simplePop = require("../js/utility");

const socket = io();

const joinForm = document.getElementById("joinForm");

joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const gameID = document.getElementById("gameID").value;

    socket.emit("joinGame", { username, gameID });

    username.value = '';
    gameID.value = '';
});

socket.on("playerJoined", ({ username }) => {
    simplePop("success", `${username} has joined the game`)
});