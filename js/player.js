const joinForm = document.getElementById("joinForm");

joinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const gameID = document.getElementById("gameID").value;

    var request = new XMLHttpRequest();
    request.open('POST','/', true);

    var jsonData = {
        "username" : username,
        "gameID": gameID
    };

    request.onreadystatechange = function()
    {
        if (request.readyState == 4 && request.status == 200)
        {
            var results = JSON.parse(request.responseText);
            console.log(results);

            if (results.Status == "Error")
            {
                // change this to display error message using a popup
                console.log(results.Message);
            }
            else
            {
                const socket = io();
                socket.emit("joinGame", { username, gameID });
            
                socket.on("playerJoined", ({ username }) => {
                    alert(`${username} has joined the game!`);
                });

                username.value = '';
                gameID.value = '';
            }
        }
    }

    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(jsonData));
});
