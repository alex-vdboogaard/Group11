const simplePop = require("../js/utility");

let inappropriateUsernames = [
    "admin", "root", "123456", "password", "12345", "2g1c", "2 girls 1 cup", "acrotomophilia",
    "alabama hot pocket", "alaskan pipeline", "anal", "anilingus", "anus", "apeshit", "arsehole",
    "ass", "asshole", "assmunch", "auto erotic", "autoerotic", "babeland", "baby batter", "baby juice",
    "ball gag", "ball gravy", "ball kicking", "ball licking", "ball sack", "ball sucking", "bangbros", "bangbus",
    "bareback", "barely legal", "barenaked", "bastard", "bastardo", "bastinado", "bbw", "bdsm", "beaner", "beaners",
    "beaver cleaver", "beaver lips", "beastiality", "bestiality", "big black", "big breasts", "big knockers", "big tits",
    "bimbos", "birdlock", "bitch", "bitches", "black cock", "blonde action", "blonde on blonde action", "blowjob",
    "blow job", "blow your load", "blue waffle", "blumpkin", "bollocks", "bondage", "boner", "boob", "boobs", "booty call",
    "brown showers", "brunette action", "bukkake", "bulldyke", "bullet vibe", "bullshit", "bung hole", "bunghole", "busty",
    "butt", "buttcheeks", "butthole", "camel toe", "camgirl", "camslut", "camwhore", "carpet muncher", "carpetmuncher",
    "chocolate rosebuds", "cialis", "circlejerk", "cleveland steamer", "clit", "clitoris", "clover clamps",
    "clusterfuck", "cock", "cocks", "coprolagnia", "coprophilia", "cornhole", "coon", "coons", "creampie", "cum",
    "cumming", "cumshot", "cumshots", "cunnilingus", "cunt", "darkie", "date rape", "daterape", "deep throat",
    "deepthroat", "dendrophilia", "dick", "dildo", "dingleberry", "dingleberries", "dirty pillows", "dirty sanchez",
    "doggie style", "doggiestyle", "doggy style", "doggystyle", "dog style", "dolcett", "domination", "dominatrix",
    "dommes", "donkey punch", "double dong", "double penetration", "dp action", "dry hump", "dvda", "eat my ass",
    "ecchi", "ejaculation", "erotic", "erotism", "escort", "eunuch", "fag", "faggot", "fecal", "felch", "fellatio",
    "feltch", "female squirting", "femdom", "figging", "fingerbang", "fingering", "fisting", "foot fetish",
    "footjob", "frotting", "fuck", "fuck buttons", "fuckin", "fucking", "fucktards", "fudge packer",
    "fudgepacker", "futanari", "gangbang", "gang bang", "gay sex", "genitals", "giant cock", "girl on",
    "girl on top", "girls gone wild", "goatcx", "goatse", "god damn", "gokkun", "golden shower", "goodpoop", "goo girl",
    "goregasm", "grope", "group sex", "g-spot", "guro", "hand job", "handjob", "hard core", "hardcore", "hentai",
    "homoerotic", "honkey", "hooker", "horny", "hot carl", "hot chick", "how to kill", "how to murder", "huge fat",
    "humping", "incest", "intercourse", "jack off", "jail bait", "jailbait", "jelly donut", "jerk off", "jigaboo",
    "jiggaboo", "jiggerboo", "jizz", "juggs", "kike", "kinbaku", "kinkster", "kinky", "knobbing", "leather restraint",
    "leather straight jacket", "lemon party", "livesex", "lolita", "lovemaking", "make me come", "male squirting",
    "masturbate", "masturbating", "masturbation", "menage a trois", "milf", "missionary position", "mong",
    "motherfucker", "mound of ven", "Icewallowcome", "Ice wallow come", "Mike Oxmall", "Hugh Janice", "Isaac Chris Peacock", "Isaac De Snutz",
    "Ben Dover", "Phil McCracken", "BEST DIRTY NAMES", "piss wrinkle", "p p suck", "fuck fuck fuckin fuckin dick dick pussy ass",
    "Philip macroch", "Duncan McCokiner", "Wilma Diqfit", "Sadie Enward", "knee grow", "Hue Janes", "Isaiah D. Enward", "Mike Oxlong", "Boo cocky",
    "gabe itch",

];

function checkUserName(username) {
    if (inappropriateUsernames.includes(username))
        return false;
    else {
        return true;
    }

}

function checkWordCount(username) {
    if (username)

}

const socket = io();

const joinForm = document.getElementById("joinForm");

joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const gameID = document.getElementById("gameID").value;
    if (checkUserName(username)) {
        socket.emit("joinGame", { username, gameID });

        username.value = '';
        gameID.value = '';
    }
    else {
        alert("Nuh uhhh")
    }
    socket.emit("joinGame", { username, gameID });

    var request = new XMLHttpRequest();
    request.open('POST', '/', true);

    var jsonData = {
        "username": username,
        "gameID": gameID
    };

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var results = JSON.parse(request.responseText);
            console.log(results);

            if (results.Status == "Error") {
                // change this to display error message using a popup
                console.log(results.Message);
            }
            else {
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

socket.on("playerJoined", ({ username }) => {
    simplePop("success", `${username} has joined the game`)
});

