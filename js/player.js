const socket = io();
console.log("Hereeee");
socket.emit('joinGame', "username", "gamecode")

