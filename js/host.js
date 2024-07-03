function closeAllPop() {
    document.querySelectorAll(".pop").forEach(pop => { pop.remove(); });
}

//this makes the popup move up out of the screen then disappear
function delayedRemove() {
    const popElements = document.querySelectorAll(".pop");
    setTimeout(function () {
        popElements.forEach(pop => {
            pop.style.transition = "margin-top 0.5s ease-out";
            pop.style.marginTop = "-80px";
            pop.addEventListener("transitionend", function () {
                pop.remove();
            }, { once: true });
        });
    }, 3000);
}

const simplePop = (type, message, position = "top") => {
    closeAllPop();
    if (type === "success") type = "pop-success";
    if (type === "error") type = "pop-error";
    const body = document.querySelector("body");
    const alert = document.createElement("div");
    alert.classList.add("pop-top", "pop", type);

    if (type === "pop-success") {
        alert.innerHTML = `<svg class="pop-svg" style="margin-right:15px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7L10 17L5 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>${message}</p>`;
    }
    else {
        alert.innerHTML = `<svg style="margin-right:15px" class="pop-svg" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2287_12)">
        <path d="M45 0C20.1445 0 0 20.1445 0 45C0 69.8555 20.1445 90 45 90C69.8555 90 90 69.8555 90 45C90 20.1445 69.8555 0 45 0ZM11.25 45C11.25 26.3496 26.3672 11.25 45 11.25C52.4004 11.25 59.2383 13.6582 64.793 17.7012L17.7012 64.793C13.6582 59.2383 11.25 52.4004 11.25 45ZM45 78.75C37.5996 78.75 30.7617 76.3418 25.207 72.2988L72.2988 25.207C76.3418 30.7793 78.75 37.5996 78.75 45C78.75 63.6504 63.6328 78.75 45 78.75Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_2287_12">
        <rect width="90" height="90" fill="white"/>
        </clipPath>
        </defs>
        </svg><p>${message}</p>`;
    }

    body.appendChild(alert);

    setTimeout(function () {
        alert.style.transition = "top 0.5s ease-out";
        alert.style.top = "10px";
    }, 100);

    delayedRemove();
}

const socket = io();
let username1 = "";
let username2 = "";

// for /gamehost
const HostBtn = document.getElementById("HostBtn");
const gameIDContainer = document.getElementById("gameIDContainer");
const gameIDSpan = document.getElementById("gameID");

// on the initial render of the page....
(function () {
    socket.emit("createGame");
})();

socket.on("gameCreated", ({ gameID }) => {
    gameIDSpan.textContent = gameID;
});

socket.on("playerJoined", ({ username }) => {
    // alert(`${username} has joined your game!`);
    simplePop("success", `${username} has joined your game!`);
    if (!username1) {
        username1 = username;
    }
    else {
        username2 = username;
    }
});

socket.on("startHosting", () => {
    // add logic here - like making a start game button visible
    // alert('The game may start');
    simplePop("success", `The game may start`);
    HostBtn.style.display = "block";
});

HostBtn.addEventListener('click', () => {
    // start the game and host moves to a new screen
    socket.emit('startGame', document.getElementById("gameID").textContent);
    localStorage.setItem('gameID', document.getElementById("gameID").textContent);
    localStorage.setItem('user1', username1);
    localStorage.setItem('user2', username2);
    window.location.href = '/host';
    // hostGameCode.innerHTML = document.getElementById("gameID").textContent;
});

//receive updated positions of balls:
socket.on("updateBalls", ({ player1 }) => {
    const player1Ball = document.querySelector("#ball1");
    player1Ball.left = player1.x;
    player1Ball.top = player1.y;
})