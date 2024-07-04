// const canvasMaze = document.getElementById("maze");
// const ctxMaze = canvasMaze.getContext("2d");
// const balls = canvasMaze.cloneNode();
// const ctx = balls.getContext("2d");
// const canvas = document.getElementById("balls");
// const ctx = canvas.getContext("2d");
let inappropriateUsernames = [
    "2 girls 1 cup",
    "2g1c",
    "4r5e",
    "5h1t",
    "5hit",
    "5ht",
    "666",
    "@$$",
    "a s s",
    "a s shole",
    "a55",
    "a55hole",
    "a_s_s",
    "abbo",
    "abeed",
    "abuse",
    "acrotomophilia",
    "aeolus",
    "africoon",
    "ahole",
    "alabama hot pocket",
    "alaskan pipeline",
    "alligator bait",
    "alligatorbait",
    "amcik",
    "anal",
    "analannie",
    "analprobe",
    "analsex",
    "andskota",
    "anilingus",
    "anus",
    "apeshit",
    "ar5e",
    "arabush",
    "arabushs",
    "areola",
    "areole",
    "argie",
    "armo",
    "armos",
    "aroused",
    "arrse",
    "arschloch",
    "arse",
    "arsehole",
    "aryan",
    "ash0le",
    "ash0les",
    "asholes",
    "ass monkey",
    "ass",
    "ass-fucker",
    "ass-hat",
    "ass-pirate",
    "assbag",
    "assbagger",
    "assbandit",
    "assbang",
    "assbanged",
    "assbanger",
    "assbangs",
    "assbite",
    "assblaster",
    "assclown",
    "asscock",
    "asscowboy",
    "asscracker",
    "asses",
    "assface",
    "assfuck",
    "assfucker",
    "assfukka",
    "assgoblin",
    "assh0le",
    "assh0lez",
    "asshat",
    "asshead",
    "assho1e",
    "asshole",
    "assholes",
    "assholz",
    "asshopper",
    "asshore",
    "assjacker",
    "assjockey",
    "asskiss",
    "asskisser",
    "assklown",
    "asslick",
    "asslicker",
    "asslover",
    "assman",
    "assmaster",
    "assmonkey",
    "assmunch",
    "assmuncher",
    "assnigger",
    "asspacker",
    "asspirate",
    "asspuppies",
    "assrammer",
    "assranger",
    "assshit",
    "assshole",
    "asssucker",
    "asswad",
    "asswhole",
    "asswhore",
    "asswipe",
    "asswipes",
    "auto erotic",
    "autoerotic",
    "ayir",
    "azazel",
    "azz",
    "azzhole",
    "b a s t a r d",
    "b i t c h",
    "b o o b",
    "b!+ch",
    "b!tch",
    "b!tchin",
    "b*tch",
    "b00b",
    "b00bies",
    "b00biez",
    "b00bs",
    "b00bz",
    "b17ch",
    "b1tch",
    "b7ch",
    "babeland",
    "babes",
    "baby batter",
    "baby juice",
    "backdoor",
    "backdoorman",
    "badfuck",
    "bagging",
    "ball gag",
    "ball gravy",
    "ball kicking",
    "ball licking",
    "ball sack",
    "ball sucking",
    "ballbag",
    "balllicker",
    "ballsack",
    "bampot",
    "bangbro",
    "bangbros",
    "bangbus",
    "banger",
    "banging",
    "bareback",
    "barely legal",
    "barelylegal",
    "barenaked",
    "barf",
    "barface",
    "barfface",
    "bassterd",
    "bassterds",
    "bastard",
    "bastardo",
    "bastards",
    "bastardz",
    "basterds",
    "basterdz",
    "bastinado",
    "bawdy",
    "bazongas",
    "bazooms",
    "bbw",
    "bdsm",
    "beaner",
    "beaners",
    "beaney",
    "beaneys",
    "beardedclam",
    "beastality",
    "beastial",
    "beastiality",
    "beastility",
    "beatch",
    "beatoff",
    "beatyourmeat",
    "beaver cleaver",
    "beaver lips",
    "beef curtains",
    "beeyotch",
    "bellend",
    "beotch",
    "bestial",
    "bestiality",
    "bi curious",
    "bi+ch",
    "bi7ch",
    "biatch",
    "bicurious",
    "big black",
    "big breasts",
    "big knockers",
    "big tits",
    "bigass",
    "bigbastard",
    "bigbreasts",
    "bigbutt",
    "bigtits",
    "bimbo",
    "bimbos",
    "bint",
    "birdlock",
    "bitch",
    "bitchass",
    "bitched",
    "bitcher",
    "bitchers",
    "bitches",
    "bitchez",
    "bitchin",
    "bitching",
    "bitchslap",
    "bitchtit",
    "bitchy",
    "biteme",
    "bitties",
    "black cock",
    "blackcock",
    "blackman",
    "blackout",
    "blacks",
    "blonde action",
    "blonde on blonde action",
    "blonde on blonde",
    "bloodclaat",
    "bloody",
    "blow j",
    "blow job",
    "blow your l",
    "blow your load",
    "blowjob",
    "blowjobs",
    "blue waffle",
    "bluegum",
    "bluegums",
    "blumpkin",
    "bo ob",
    "bo obs",
    "boang",
    "boche",
    "boches",
    "bodily",
    "boffing",
    "bogan",
    "bohunk",
    "boink",
    "boiolas",
    "bollick",
    "bollock",
    "bollocks",
    "bollok",
    "bollox",
    "bombers",
    "bombing",
    "bomd",
    "bondage",
    "boned",
    "boner",
    "boners",
    "bong",
    "bookie",
    "boong",
    "boonga",
    "boongas",
    "boongs",
    "boonie",
    "boonies",
    "booobs",
    "boooobs",
    "booooobs",
    "booooooobs",
    "bootee",
    "bootlip",
    "bootlips",
    "boozer",
    "boozy",
    "bosch",
    "bosche",
    "bosches",
    "boschs",
    "bosomy",
    "bounty bar",
    "bounty bars",
    "bountybar",
    "brea5t",
    "breastjob",
    "breastlover",
    "breastman",
    "brown shower",
    "brown showers",
    "brunette action",
    "btch",
    "buceta",
    "buddhahead",
    "buddhaheads",
    "buffies",
    "bugger",
    "buggered",
    "buggery",
    "bukake",
    "bukkake",
    "bullcrap",
    "bulldike",
    "bulldyke",
    "bullet vibe",
    "bullshit",
    "bullshits",
    "bullshitted",
    "bullturds",
    "bumblefuck",
    "bumfuck",
    "bung hole",
    "bung",
    "bunga",
    "bungas",
    "bunghole",
    "bunny fucker",
    "burr head",
    "burr heads",
    "burrhead",
    "burrheads",
    "butchbabes",
    "butchdike",
    "butchdyke",
    "butt plug",
    "butt-pirate",
    "buttbang",
    "buttcheeks",
    "buttface",
    "buttfuck",
    "buttfucker",
    "buttfuckers",
    "butthead",
    "butthole",
    "buttman",
    "buttmuch",
    "buttmunch",
    "buttmuncher",
    "buttpirate",
    "buttplug",
    "buttstain",
    "buttwipe",
    "byatch",
    "c u n t",
    "c-0-c-k",
    "c-o-c-k",
    "c-u-n-t",
    "c.0.c.k",
    "c.o.c.k.",
    "c.u.n.t",
    "c0ck",
    "c0cks",
    "c0cksucker",
    "c0k",
    "cabron",
    "caca",
    "cacker",
    "cahone",
    "camel jockey",
    "camel jockeys",
    "camel toe",
    "cameljockey",
    "cameltoe",
    "camgirl",
    "camslut",
    "camwhore",
    "carpet muncher",
    "carpetmuncher",
    "carruth",
    "cawk",
    "cawks",
    "cazzo",
    "cervix",
    "chav",
    "cheese eating surrender monkey",
    "cheese eating surrender monkies",
    "cheeseeating surrender monkey",
    "cheeseeating surrender monkies",
    "cheesehead",
    "cheeseheads",
    "cherrypopper",
    "chickslick",
    "china swede",
    "china swedes",
    "chinaman",
    "chinamen",
    "chinaswede",
    "chinaswedes",
    "chinc",
    "chincs",
    "ching chong",
    "ching chongs",
    "chinga",
    "chingchong",
    "chingchongs",
    "chink",
    "chinks",
    "chinky",
    "choad",
    "chocolate rosebuds",
    "chode",
    "chodes",
    "chonkies",
    "chonky",
    "chonkys",
    "chraa",
    "christ killer",
    "christ killers",
    "chug",
    "chugs",
    "chuj",
    "chunger",
    "chungers",
    "chunkies",
    "chunkys",
    "chute",
    "cipa",
    "circlejerk",
    "cl1t",
    "clamdigger",
    "clamdiver",
    "clamps",
    "clansman",
    "clansmen",
    "clanswoman",
    "clanswomen",
    "cleveland steamer",
    "clit",
    "clitface",
    "clitfuck",
    "clitoris",
    "clitorus",
    "clits",
    "clitty",
    "clogwog",
    "clover clamps",
    "clusterfuck",
    "cnts",
    "cntz",
    "cnut",
    "cocain",
    "cocaine",
    "cock",
    "cock-head",
    "cock-sucker",
    "cockbite",
    "cockblock",
    "cockblocker",
    "cockburger",
    "cockcowboy",
    "cockface",
    "cockfight",
    "cockfucker",
    "cockhead",
    "cockholster",
    "cockjockey",
    "cockknob",
    "cockknocker",
    "cockknoker",
    "cocklicker",
    "cocklover",
    "cockmaster",
    "cockmongler",
    "cockmongruel",
    "cockmonkey",
    "cockmunch",
    "cockmuncher",
    "cocknob",
    "cocknose",
    "cocknugget",
    "cockqueen",
    "cockrider",
    "cocks",
    "cockshit",
    "cocksman",
    "cocksmith",
    "cocksmoker",
    "cocksucer",
    "cocksuck",
    "cocksucked",
    "cocksucker",
    "cocksucking",
    "cocksucks",
    "cocksuka",
    "cocksukka",
    "cocktease",
    "cocky",
    "cohee",
    "coital",
    "coitus",
    "cok",
    "cokmuncher",
    "coksucka",
    "commie",
    "condom",
    "coochie",
    "coochy",
    "coolie",
    "coolies",
    "cooly",
    "coon ass",
    "coon asses",
    "coonass",
    "coonasses",
    "coondog",
    "coons",
    "cooter",
    "coprolagnia",
    "coprophilia",
    "copulate",
    "corksucker",
    "cornhole",
    "cra5h",
    "crabs",
    "crackcocain",
    "cracker",
    "crackpipe",
    "crackwhore",
    "crap",
    "crapola",
    "crapper",
    "crappy",
    "creampie",
    "crotch",
    "crotchjockey",
    "crotchmonkey",
    "crotchrot",
    "cuck",
    "cum face",
    "cum licker",
    "cum",
    "cumbubble",
    "cumdumpster",
    "cumfest",
    "cumguzzler",
    "cuming",
    "cumjockey",
    "cumlickr",
    "cumm",
    "cummer",
    "cummin",
    "cumming",
    "cumquat",
    "cumqueen",
    "cums",
    "cumshot",
    "cumshots",
    "cumslut",
    "cumstain",
    "cumsucker",
    "cumtart",
    "cunilingus",
    "cunillingus",
    "cunn",
    "cunnie",
    "cunnilingus",
    "cunntt",
    "cunny",
    "cunt",
    "cunteyed",
    "cuntface",
    "cuntfuck",
    "cuntfucker",
    "cunthole",
    "cunthunter",
    "cuntlick",
    "cuntlicker",
    "cuntlicking",
    "cuntrag",
    "cunts",
    "cuntslut",
    "cuntsucker",
    "cuntz",
    "curry muncher",
    "curry munchers",
    "currymuncher",
    "currymunchers",
    "cushi",
    "cushis",
    "cyalis",
    "cyberfuc",
    "cyberfuck",
    "cyberfucked",
    "cyberfucker",
    "cyberfuckers",
    "cyberfucking",
    "cybersex",
    "cyberslimer",
    "d0ng",
    "d0uch3",
    "d0uche",
    "d1ck",
    "d1ld0",
    "d1ldo",
    "d4mn",
    "dago",
    "dagos",
    "dahmer",
    "damm",
    "dammit",
    "damn",
    "damnation",
    "damned",
    "damnit",
    "darkey",
    "darkeys",
    "darkie",
    "darkies",
    "darky",
    "date rape",
    "daterape",
    "datnigga",
    "dawgie style",
    "dawgie-style",
    "daygo",
    "deapthroat",
    "deep throat",
    "deep throating",
    "deepaction",
    "deepthroat",
    "deepthroating",
    "defecate",
    "deggo",
    "dego",
    "degos",
    "demon",
    "dendrophilia",
    "destroyyourpussy",
    "deth",
    "diaper daddy",
    "diaper head",
    "diaper heads",
    "diaperdaddy",
    "diaperhead",
    "diaperheads",
    "dick pic",
    "dick",
    "dick-ish",
    "dickbag",
    "dickbeater",
    "dickbeaters",
    "dickbrain",
    "dickdipper",
    "dickface",
    "dickflipper",
    "dickforbrains",
    "dickfuck",
    "dickhead",
    "dickheads",
    "dickhole",
    "dickish",
    "dickjuice",
    "dickless",
    "dicklick",
    "dicklicker",
    "dickman",
    "dickmilk",
    "dickmonger",
    "dickpic",
    "dickripper",
    "dicks",
    "dicksipper",
    "dickslap",
    "dickslicker",
    "dicksucker",
    "dickwad",
    "dickweasel",
    "dickweed",
    "dickwhipper",
    "dickwod",
    "dickzipper",
    "diddle",
    "dike",
    "dild0",
    "dild0s",
    "dildo",
    "dildos",
    "dilf",
    "diligaf",
    "dilld0",
    "dilld0s",
    "dillweed",
    "dimwit",
    "dingle",
    "dingleberries",
    "dingleberry",
    "dink",
    "dinks",
    "dipship",
    "dipshit",
    "dipstick",
    "dirsa",
    "dirty pillows",
    "dirty sanchez",
    "dix",
    "dixiedike",
    "dixiedyke",
    "dlck",
    "dog style",
    "dog-fucker",
    "doggie style",
    "doggie",
    "doggie-style",
    "doggiestyle",
    "doggin",
    "dogging",
    "doggy style",
    "doggy-style",
    "doggystyle",
    "dolcett",
    "domination",
    "dominatricks",
    "dominatrics",
    "dominatrix",
    "dommes",
    "dong",
    "donkey punch",
    "donkeypunch",
    "donkeyribber",
    "doochbag",
    "doodoo",
    "doofus",
    "dookie",
    "doosh",
    "dot head",
    "dot heads",
    "dothead",
    "dotheads",
    "double dong",
    "double penetration",
    "doubledong",
    "doublepenetration",
    "douch3",
    "douche bag",
    "douche",
    "douche-fag",
    "douchebag",
    "douchebags",
    "douchewaffle",
    "douchey",
    "dp action",
    "dpaction",
    "dragqueen",
    "dragqween",
    "dripdick",
    "dry hump",
    "dryhump",
    "duche",
    "dudette",
    "dumass",
    "dumb ass",
    "dumbass",
    "dumbasses",
    "dumbbitch",
    "dumbfuck",
    "dumbshit",
    "dumshit",
    "dune coon",
    "dune coons",
    "dupa",
    "dvda",
    "dyefly",
    "dyke",
    "dykes",
    "dziwka",
    "earotics",
    "easyslut",
    "eat my ass",
    "eat my",
    "eatadick",
    "eatballs",
    "eathairpie",
    "eatme",
    "eatmyass",
    "eatpussy",
    "ecchi",
    "ejackulate",
    "ejakulate",
    "ekrem",
    "ekto",
    "enculer",
    "enema",
    "enlargement",
    "erect",
    "erection",
    "ero",
    "erotic",
    "erotism",
    "escort",
    "esqua",
    "essohbee",
    "ethical slut",
    "evl",
    "excrement",
    "exkwew",
    "extacy",
    "extasy",
    "f u c k e r",
    "f u c k e",
    "f u c k",
    "f u k",
    "f*ck",
    "f-u-c-k",
    "f.u.c.k",
    "f4nny",
    "f_u_c_k",
    "facefucker",
    "fack",
    "faeces",
    "faen",
    "fag",
    "fag1t",
    "fagbag",
    "faget",
    "fagfucker",
    "fagg",
    "fagg1t",
    "fagged",
    "fagging",
    "faggit",
    "faggitt",
    "faggot",
    "faggotcock",
    "faggs",
    "fagit",
    "fagot",
    "fagots",
    "fags",
    "fagt",
    "fagtard",
    "fagz",
    "faig",
    "faigs",
    "faigt",
    "fanculo",
    "fannybandit",
    "fannyflaps",
    "fannyfucker",
    "fanyy",
    "fartknocker",
    "fastfuck",
    "fatah",
    "fatfuck",
    "fatfucker",
    "fatso",
    "fck",
    "fckcum",
    "fckd",
    "fcuk",
    "fcuker",
    "fcuking",
    "fecal",
    "feck",
    "fecker",
    "feg",
    "felatio",
    "felch",
    "felcher",
    "felching",
    "fellate",
    "fellatio",
    "feltch",
    "feltcher",
    "feltching",
    "female squirting",
    "femalesquirtin",
    "femalesquirting",
    "femdom",
    "fetish",
    "ficken",
    "figging",
    "fingerbang",
    "fingerfood",
    "fingerfuck",
    "fingerfucked",
    "fingerfucker",
    "fingerfuckers",
    "fingerfucking",
    "fingerfucks",
    "fingering",
    "fisted",
    "fister",
    "fistfuck",
    "fistfucked",
    "fistfucker",
    "fistfuckers",
    "fistfucking",
    "fistfuckings",
    "fistfucks",
    "fisting",
    "fisty",
    "fitt",
    "flamer",
    "flange",
    "flasher",
    "flikker",
    "flipping the bird",
    "flogthelog",
    "floo",
    "floozy",
    "flydie",
    "flydye",
    "foad",
    "fok",
    "fondle",
    "foobar",
    "fook",
    "fooker",
    "foot fetish",
    "footaction",
    "footfetish",
    "footfuck",
    "footfucker",
    "footjob",
    "footlicker",
    "footstar",
    "foreskin",
    "forni",
    "fornicate",
    "fotze",
    "foursome",
    "fourtwenty",
    "freakfuck",
    "freakyfucker",
    "freefuck",
    "freex",
    "frigg",
    "frigga",
    "frigger",
    "frotting",
    "fucck",
    "fuck",
    "fuck-tard",
    "fucka",
    "fuckable",
    "fuckass",
    "fuckbag",
    "fuckbitch",
    "fuckbook",
    "fuckboy",
    "fuckbrain",
    "fuckbuddy",
    "fuckbutt",
    "fuckd",
    "fucked",
    "fuckedup",
    "fucker",
    "fuckers",
    "fuckersucker",
    "fuckface",
    "fuckfest",
    "fuckfreak",
    "fuckfriend",
    "fuckhead",
    "fuckheads",
    "fuckher",
    "fuckhole",
    "fuckin",
    "fuckina",
    "fucking",
    "fuckingbitch",
    "fuckings",
    "fuckingshitmotherfucker",
    "fuckinnuts",
    "fuckinright",
    "fuckit",
    "fuckknob",
    "fuckme",
    "fuckmeat",
    "fuckmehard",
    "fuckmonkey",
    "fuckn",
    "fucknugget",
    "fucknut",
    "fucknuts",
    "fucknutt",
    "fucknutz",
    "fuckoff",
    "fuckpig",
    "fuckpuppet",
    "fuckr",
    "fucks",
    "fuckstick",
    "fucktard",
    "fucktards",
    "fucktoy",
    "fucktrophy",
    "fuckup",
    "fuckwad",
    "fuckwhit",
    "fuckwhore",
    "fuckwit",
    "fuckwitt",
    "fuckyomama",
    "fuckyou",
    "fudge packer",
    "fudgepacker",
    "fugly",
    "fuk",
    "fukah",
    "fuken",
    "fuker",
    "fukin",
    "fuking",
    "fukk",
    "fukkah",
    "fukken",
    "fukker",
    "fukkin",
    "fukking",
    "fuks",
    "fuktard",
    "fuktards",
    "fukwhit",
    "fukwit",
    "funfuck",
    "fungus",
    "futanari",
    "futanary",
    "futkretzn",
    "fuuck",
    "fux",
    "fux0r",
    "fuxor",
    "fvck",
    "fvk",
    "fxck",
    "g-spot",
    "g00k",
    "gae",
    "gai",
    "gang bang",
    "gangbang",
    "gangbanged",
    "gangbanger",
    "gangbangs",
    "gangsta",
    "ganja",
    "gassyass",
    "gator bait",
    "gatorbait",
    "gay sex",
    "gayass",
    "gaybob",
    "gayboy",
    "gaydo",
    "gaygirl",
    "gaylord",
    "gaymuthafuckinwhore",
    "gays",
    "gaysex",
    "gaytard",
    "gaywad",
    "gayz",
    "geezer",
    "geni",
    "genital",
    "genitals",
    "getiton",
    "gey",
    "gfy",
    "ghay",
    "ghey",
    "giant cock",
    "gigolo",
    "ginzo",
    "ginzos",
    "gipp",
    "gippo",
    "gippos",
    "gipps",
    "girl on top",
    "girl on",
    "girls gone wild",
    "givehead",
    "glans",
    "glazeddonut",
    "goatcx",
    "goatse",
    "gob",
    "god dammit",
    "god damn",
    "god damnit",
    "god-dam",
    "god-damned",
    "godam",
    "godammit",
    "godamn",
    "godamnit",
    "goddam",
    "goddamit",
    "goddamm",
    "goddammit",
    "goddamn",
    "goddamned",
    "goddamnes",
    "goddamnit",
    "goddamnmuthafucker",
    "godsdamn",
    "gokkun",
    "golden shower",
    "goldenshower",
    "golliwog",
    "golliwogs",
    "gonad",
    "gonads",
    "gonorrehea",
    "gonzagas",
    "goo girl",
    "gooch",
    "goodpoop",
    "gook eye",
    "gook eyes",
    "gook",
    "gookeye",
    "gookeyes",
    "gookies",
    "gooks",
    "gooky",
    "gora",
    "goras",
    "goregasm",
    "gotohell",
    "goy",
    "goyim",
    "greaseball",
    "greaseballs",
    "groe",
    "groid",
    "groids",
    "grope",
    "grostulation",
    "group sex",
    "gspot",
    "gstring",
    "gtfo",
    "gub",
    "gubba",
    "gubbas",
    "gubs",
    "guido",
    "guiena",
    "guineas",
    "guizi",
    "gummer",
    "guro",
    "gwailo",
    "gwailos",
    "gweilo",
    "gweilos",
    "gyopo",
    "gyopos",
    "gyp",
    "gyped",
    "gypo",
    "gypos",
    "gypp",
    "gypped",
    "gyppie",
    "gyppies",
    "gyppo",
    "gyppos",
    "gyppy",
    "gyppys",
    "gypsys",
    "h e l l",
    "h o m",
    "h00r",
    "h0ar",
    "h0m0",
    "h0mo",
    "h0r",
    "h0re",
    "h4x0r",
    "hadji",
    "hadjis",
    "hairyback",
    "hairybacks",
    "haji",
    "hajis",
    "hajji",
    "hajjis",
    "half breed",
    "half caste",
    "halfbreed",
    "halfcaste",
    "hamas",
    "hamflap",
    "hand job",
    "handjob",
    "haole",
    "haoles",
    "hapa",
    "hard core",
    "hardcore",
    "hardcoresex",
    "hardon",
    "harem",
    "he11",
    "headfuck",
    "hebe",
    "hebes",
    "heeb",
    "heebs",
    "hell",
    "hells",
    "helvete",
    "hentai",
    "heroin",
    "herp",
    "herpes",
    "herpy",
    "heshe",
    "hijacker",
    "hijacking",
    "hillbillies",
    "hillbilly",
    "hindoo",
    "hiscock",
    "hitler",
    "hitlerism",
    "hitlerist",
    "hoar",
    "hoare",
    "hobag",
    "hodgie",
    "hoe",
    "hoer",
    "hoes",
    "holestuffer",
    "hom0",
    "homey",
    "homo",
    "homobangers",
    "homodumbshit",
    "homoey",
    "honger",
    "honkers",
    "honkey",
    "honkeys",
    "honkie",
    "honkies",
    "honky",
    "hooch",
    "hooker",
    "hookers",
    "hoor",
    "hoore",
    "hootch",
    "hooter",
    "hooters",
    "hore",
    "hori",
    "horis",
    "hork",
    "horndawg",
    "horndog",
    "horney",
    "horniest",
    "horny",
    "horseshit",
    "hosejob",
    "hoser",
    "hot carl",
    "hot chick",
    "hotcarl",
    "hotdamn",
    "hotpussy",
    "hotsex",
    "hottotrot",
    "how to kill",
    "how to murder",
    "howtokill",
    "howtomurdep",
    "huevon",
    "huge fat",
    "hugefat",
    "hui",
    "hummer",
    "humped",
    "humper",
    "humpher",
    "humphim",
    "humpin",
    "humping",
    "hussy",
    "hustler",
    "hymen",
    "hymie",
    "hymies",
    "iblowu",
    "ike",
    "ikes",
    "ikey",
    "ikeymo",
    "ikeymos",
    "ikwe",
    "illegal",
    "illegals",
    "inbred",
    "incest",
    "indon",
    "indons",
    "injun",
    "injuns",
    "insest",
    "intercourse",
    "interracial",
    "intheass",
    "inthebuff",
    "israels",
    "j3rk0ff",
    "jack off",
    "jack-off",
    "jackass",
    "jackhole",
    "jackoff",
    "jackshit",
    "jacktheripper",
    "jail bait",
    "jailbait",
    "jap",
    "japcrap",
    "japie",
    "japies",
    "japs",
    "jebus",
    "jelly donut",
    "jerk off",
    "jerk",
    "jerk-off",
    "jerk0ff",
    "jerked",
    "jerkoff",
    "jerries",
    "jerry",
    "jewboy",
    "jewed",
    "jewess",
    "jiga",
    "jigaboo",
    "jigaboos",
    "jigarooni",
    "jigaroonis",
    "jigg",
    "jigga",
    "jiggabo",
    "jiggaboo",
    "jiggabos",
    "jiggas",
    "jigger",
    "jiggerboo",
    "jiggers",
    "jiggs",
    "jiggy",
    "jigs",
    "jihad",
    "jijjiboo",
    "jijjiboos",
    "jimfish",
    "jisim",
    "jism",
    "jiss",
    "jiz",
    "jizim",
    "jizin",
    "jizjuice",
    "jizm",
    "jizn",
    "jizz",
    "jizzd",
    "jizzed",
    "jizzim",
    "jizzin",
    "jizzn",
    "jizzum",
    "jugg",
    "juggs",
    "jugs",
    "jungle bunnies",
    "jungle bunny",
    "junglebunny",
    "junkie",
    "junky",
    "kacap",
    "kacapas",
    "kacaps",
    "kaffer",
    "kaffir",
    "kaffre",
    "kafir",
    "kanake",
    "kanker",
    "katsap",
    "katsaps",
    "kawk",
    "khokhol",
    "khokhols",
    "kicking",
    "kigger",
    "kike",
    "kikes",
    "kimchis",
    "kinbaku",
    "kink",
    "kinkster",
    "kinky",
    "kinkyJesus",
    "kissass",
    "kiunt",
    "kkk",
    "klan",
    "klansman",
    "klansmen",
    "klanswoman",
    "klanswomen",
    "klootzak",
    "knobbing",
    "knobead",
    "knobed",
    "knobend",
    "knobhead",
    "knobjocky",
    "knobjokey",
    "knobz",
    "knockers",
    "knulle",
    "kock",
    "kondum",
    "kondums",
    "kooch",
    "kooches",
    "koon",
    "kootch",
    "krap",
    "krappy",
    "kraut",
    "krauts",
    "kuffar",
    "kuk",
    "kuksuger",
    "kum",
    "kumbubble",
    "kumbullbe",
    "kumer",
    "kummer",
    "kumming",
    "kumquat",
    "kums",
    "kunilingus",
    "kunnilingus",
    "kunt",
    "kunts",
    "kuntz",
    "kurac",
    "kurwa",
    "kushi",
    "kushis",
    "kusi",
    "kwa",
    "kwai lo",
    "kwai los",
    "kwif",
    "kyke",
    "kykes",
    "kyopo",
    "kyopos",
    "kyrpa",
    "l3i+ch",
    "l3i\\+ch",
    "l3itch",
    "labia",
    "lapdance",
    "leather restraint",
    "leather straight",
    "leatherrestraint",
    "lebos",
    "lech",
    "lemon party",
    "lemonparty",
    "leper",
    "lesbain",
    "lesbayn",
    "lesbin",
    "lesbo",
    "lesbos",
    "lez",
    "lezbe",
    "lezbefriends",
    "lezbian",
    "lezbians",
    "lezbo",
    "lezbos",
    "lezz",
    "lezzian",
    "lezzie",
    "lezzies",
    "lezzo",
    "lezzy",
    "libido",
    "licker",
    "licking",
    "lickme",
    "lilniglet",
    "limey",
    "limpdick",
    "limy",
    "lingerie",
    "lipshits",
    "lipshitz",
    "livesex",
    "loadedgun",
    "loin",
    "loins",
    "lolita",
    "lovebone",
    "lovegoo",
    "lovegun",
    "lovejuice",
    "lovemaking",
    "lovemuscle",
    "lovepistol",
    "loverocket",
    "lowlife",
    "lsd",
    "lubejob",
    "lubra",
    "lucifer",
    "luckycammeltoe",
    "lugan",
    "lugans",
    "lust",
    "lusting",
    "lusty",
    "lynch",
    "m-fucking",
    "m0f0",
    "m0fo",
    "m45terbate",
    "ma5terb8",
    "ma5terbate",
    "mabuno",
    "mabunos",
    "macaca",
    "macacas",
    "mafugly",
    "magicwand",
    "mahbuno",
    "mahbunos",
    "make me come",
    "makemecome",
    "makemecum",
    "male squirting",
    "mamhoon",
    "mams",
    "manhater",
    "manpaste",
    "maricon",
    "maricón",
    "marijuana",
    "masochist",
    "masokist",
    "massa",
    "massterbait",
    "masstrbait",
    "masstrbate",
    "mastabate",
    "mastabater",
    "master-bate",
    "masterb8",
    "masterbaiter",
    "masterbat",
    "masterbat3",
    "masterbate",
    "masterbates",
    "masterbating",
    "masterbation",
    "masterbations",
    "masterblaster",
    "mastrabator",
    "masturbat",
    "masturbate",
    "masturbating",
    "masturbation",
    "mattressprincess",
    "mau mau",
    "mau maus",
    "maumau",
    "maumaus",
    "mcfagget",
    "meatbeatter",
    "meatrack",
    "menage",
    "merd",
    "mgger",
    "mggor",
    "mibun",
    "mick",
    "mickeyfinn",
    "mideast",
    "mierda",
    "milf",
    "minge",
    "minger",
    "mo-fo",
    "mockey",
    "mockie",
    "mocky",
    "mof0",
    "mofo",
    "moky",
    "molest",
    "molestation",
    "molester",
    "molestor",
    "moneyshot",
    "mong",
    "monkleigh",
    "moolie",
    "moon cricket",
    "moon crickets",
    "mooncricket",
    "mooncrickets",
    "mormon",
    "moron",
    "moskal",
    "moskals",
    "moslem",
    "mosshead",
    "motha fucker",
    "motha fuker",
    "motha fukkah",
    "motha fukker",
    "mothafuck",
    "mothafucka",
    "mothafuckas",
    "mothafuckaz",
    "mothafucked",
    "mothafucker",
    "mothafuckers",
    "mothafuckin",
    "mothafucking",
    "mothafuckings",
    "mothafucks",
    "mother fucker",
    "mother fukah",
    "mother fuker",
    "mother fukkah",
    "mother fukker",
    "mother-fucker",
    "motherfuck",
    "motherfucka",
    "motherfucked",
    "motherfucker",
    "motherfuckers",
    "motherfuckin",
    "motherfucking",
    "motherfuckings",
    "motherfuckka",
    "motherfucks",
    "motherfvcker",
    "motherlovebone",
    "mothrfucker",
    "mouliewop",
    "mound of venus",
    "moundofvenus",
    "mr hands",
    "mrhands",
    "mtherfucker",
    "mthrfuck",
    "mthrfucker",
    "mthrfucking",
    "mtrfck",
    "mtrfuck",
    "mtrfucker",
    "muff diver",
    "muff",
    "muffdive",
    "muffdiver",
    "muffdiving",
    "muffindiver",
    "mufflikcer",
    "muffpuff",
    "muie",
    "mulatto",
    "mulkku",
    "muncher",
    "mung",
    "munging",
    "munt",
    "munter",
    "muschi",
    "mutha fucker",
    "mutha fukah",
    "mutha fuker",
    "mutha fukkah",
    "mutha fukker",
    "muthafecker",
    "muthafuckaz",
    "muthafucker",
    "muthafuckker",
    "muther",
    "mutherfucker",
    "mutherfucking",
    "muthrfucking",
    "mzungu",
    "mzungus",
    "n1gga",
    "n1gger",
    "n1gr",
    "nad",
    "nads",
    "naked",
    "nambla",
    "nappy",
    "nastt",
    "nasty",
    "nastybitch",
    "nastyho",
    "nastyslut",
    "nastywhore",
    "nawashi",
    "nazi",
    "nazis",
    "nazism",
    "necked",
    "necro",
    "needthedick",
    "negres",
    "negress",
    "negro",
    "negroes",
    "negroid",
    "negros",
    "neonazi",
    "nepesaurio",
    "nig nog",
    "nig",
    "niga",
    "nigar",
    "nigars",
    "nigas",
    "nigers",
    "nigette",
    "nigettes",
    "nigg",
    "nigg3r",
    "nigg4h",
    "nigga",
    "niggah",
    "niggahs",
    "niggar",
    "niggaracci",
    "niggard",
    "niggarded",
    "niggarding",
    "niggardliness",
    "niggardlinesss",
    "niggardly",
    "niggards",
    "niggars",
    "niggas",
    "niggaz",
    "nigger",
    "niggerhead",
    "niggerhole",
    "niggers",
    "niggle",
    "niggled",
    "niggles",
    "niggling",
    "nigglings",
    "niggor",
    "niggress",
    "niggresses",
    "nigguh",
    "nigguhs",
    "niggur",
    "niggurs",
    "niglet",
    "nignog",
    "nigor",
    "nigors",
    "nigr",
    "nigra",
    "nigras",
    "nigre",
    "nigres",
    "nigress",
    "nigs",
    "nigur",
    "niiger",
    "niigr",
    "nimphomania",
    "nimrod",
    "ninny",
    "nip",
    "nipple",
    "nipplering",
    "nipples",
    "nips",
    "nittit",
    "nlgger",
    "nlggor",
    "nob jokey",
    "nob",
    "nobhead",
    "nobjocky",
    "nobjokey",
    "nofuckingway",
    "nog",
    "nookey",
    "nookie",
    "nooky",
    "noonan",
    "nooner",
    "nsfw images",
    "nsfw",
    "nudger",
    "nudie",
    "nudies",
    "numbnuts",
    "nut sack",
    "nutbutter",
    "nutfucker",
    "nutsack",
    "nutten",
    "nymph",
    "nympho",
    "nymphomania",
    "o c k",
    "octopussy",
    "omorashi",
    "one cup two girls",
    "one guy one jar",
    "one guy",
    "one jar",
    "ontherag",
    "orafis",
    "orally",
    "orga",
    "orgasim",
    "orgasim;",
    "orgasims",
    "orgasm",
    "orgasmic",
    "orgasms",
    "orgasum",
    "orgies",
    "orgy",
    "oriface",
    "orifice",
    "orifiss",
    "orospu",
    "osama",
    "ovum",
    "ovums",
    "p e n i s",
    "p i s",
    "p u s s y",
    "p.u.s.s.y.",
    "p0rn",
    "packi",
    "packie",
    "packy",
    "paddy",
    "paedophile",
    "paki",
    "pakie",
    "pakis",
    "paky",
    "palesimian",
    "pancake face",
    "pancake faces",
    "panooch",
    "pansies",
    "pansy",
    "panti",
    "pantie",
    "panties",
    "panty",
    "paska",
    "pastie",
    "pasty",
    "payo",
    "pcp",
    "pearlnecklace",
    "pecker",
    "peckerhead",
    "peckerwood",
    "pedo",
    "pedobear",
    "pedophile",
    "pedophilia",
    "pedophiliac",
    "peeenus",
    "peeenusss",
    "peehole",
    "peenus",
    "peepee",
    "peepshow",
    "peepshpw",
    "pegging",
    "peinus",
    "pen1s",
    "penas",
    "pendejo",
    "pendy",
    "penetrate",
    "penetration",
    "peni5",
    "penial",
    "penile",
    "penis",
    "penis-breath",
    "penises",
    "penisfucker",
    "penisland",
    "penislick",
    "penislicker",
    "penispuffer",
    "penthouse",
    "penus",
    "penuus",
    "perse",
    "perv",
    "perversion",
    "peyote",
    "phalli",
    "phallic",
    "phone sex",
    "phonesex",
    "phuc",
    "phuck",
    "phuk",
    "phuked",
    "phuker",
    "phuking",
    "phukked",
    "phukker",
    "phukking",
    "phuks",
    "phungky",
    "phuq",
    "pi55",
    "picaninny",
    "piccaninny",
    "picka",
    "pickaninnies",
    "pickaninny",
    "piece of shit",
    "pieceofshit",
    "piefke",
    "piefkes",
    "pierdol",
    "pigfucker",
    "piker",
    "pikey",
    "piky",
    "pillowbiter",
    "pillu",
    "pimmel",
    "pimp",
    "pimped",
    "pimper",
    "pimpis",
    "pimpjuic",
    "pimpjuice",
    "pimpsimp",
    "pindick",
    "pinko",
    "pis",
    "pises",
    "pisin",
    "pising",
    "pisof",
    "piss pig",
    "piss",
    "piss-off",
    "pissed",
    "pisser",
    "pissers",
    "pisses",
    "pissflap",
    "pissflaps",
    "pisshead",
    "pissin",
    "pissing",
    "pissoff",
    "pisspig",
    "pistol",
    "pizda",
    "playboy",
    "playgirl",
    "pleasure chest",
    "pleasurechest",
    "pocha",
    "pochas",
    "pocho",
    "pochos",
    "pocketpool",
    "pohm",
    "pohms",
    "polac",
    "polack",
    "polacks",
    "polak",
    "pole smoker",
    "polesmoker",
    "pollock",
    "pollocks",
    "pommie grant",
    "pommie grants",
    "pommy",
    "ponyplay",
    "poof",
    "poon",
    "poonani",
    "poonany",
    "poontang",
    "poontsee",
    "poop chute",
    "poopchute",
    "pooper",
    "pooperscooper",
    "pooping",
    "poorwhitetrash",
    "popimp",
    "porch monkey",
    "porch monkies",
    "porchmonkey",
    "porn",
    "pornflick",
    "pornking",
    "porno",
    "pornography",
    "pornos",
    "pornprincess",
    "pound town",
    "poundtown",
    "pplicker",
    "pr0n",
    "pr1c",
    "pr1ck",
    "pr1k",
    "prairie nigger",
    "prairie niggers",
    "premature",
    "preteen",
    "pric",
    "prickhead",
    "pricks",
    "prig",
    "prince albert piercing",
    "pron",
    "prostitute",
    "pthc",
    "pu55i",
    "pu55y",
    "pube",
    "pubes",
    "pubic",
    "pubiclice",
    "pubis",
    "pud",
    "pudboy",
    "pudd",
    "puddboy",
    "puke",
    "pula",
    "pule",
    "punani",
    "punanny",
    "punany",
    "punkass",
    "punky",
    "punta",
    "puntang",
    "purinapricness",
    "pusies",
    "puss",
    "pusse",
    "pussee",
    "pussi",
    "pussie",
    "pussies",
    "pussy",
    "pussycat",
    "pussydestroyer",
    "pussyeater",
    "pussyfart",
    "pussyfucker",
    "pussylicker",
    "pussylicking",
    "pussylips",
    "pussylover",
    "pussypalace",
    "pussypounder",
    "pussys",
    "pusy",
    "puta",
    "puto",
    "puuke",
    "puuker",
    "qahbeh",
    "quashie",
    "queaf",
    "queef",
    "queerhole",
    "queero",
    "queers",
    "queerz",
    "quickie",
    "quicky",
    "quiff",
    "quim",
    "qweers",
    "qweerz",
    "qweir",
    "r-tard",
    "r-tards",
    "r5e",
    "ra8s",
    "raghead",
    "ragheads",
    "rape",
    "raped",
    "raper",
    "raping",
    "rapist",
    "rautenberg",
    "rearend",
    "rearentry",
    "recktum",
    "rectal",
    "rectum",
    "rectus",
    "redleg",
    "redlegs",
    "redlight",
    "redneck",
    "rednecks",
    "redskin",
    "redskins",
    "reefer",
    "reestie",
    "reetard",
    "reich",
    "renob",
    "rentafuck",
    "rere",
    "retard",
    "retarded",
    "retards",
    "retardz",
    "reverse cowgirl",
    "reversecowgirl",
    "rigger",
    "rimjaw",
    "rimjob",
    "rimming",
    "ritard",
    "rosebuds",
    "rosy palm and her 5 sisters",
    "rosy palm",
    "rosypalm",
    "rosypalmandher5sisters",
    "rosypalmandherefivesisters",
    "round eyes",
    "roundeye",
    "rtard",
    "rtards",
    "rumprammer",
    "ruski",
    "russki",
    "russkie",
    "rusty trombone",
    "rustytrombone",
    "s h i t",
    "s hit",
    "s&m",
    "s-h-1-t",
    "s-h-i-t",
    "s-o-b",
    "s.h.i.t.",
    "s.o.b.",
    "s0b",
    "s_h_i_t",
    "sac",
    "sadis",
    "sadism",
    "sadist",
    "sadom",
    "sambo",
    "sambos",
    "samckdaddy",
    "sanchez",
    "sand nigger",
    "sand niggers",
    "sandm",
    "sandnigger",
    "santorum",
    "sausagequeen",
    "scag",
    "scallywag",
    "scank",
    "scantily",
    "scat",
    "schaffer",
    "scheiss",
    "schizo",
    "schlampe",
    "schlong",
    "schmuck",
    "schvartse",
    "schvartsen",
    "schwartze",
    "schwartzen",
    "scissoring",
    "screwed",
    "screwing",
    "screwyou",
    "scroat",
    "scrog",
    "scrote",
    "scrotum",
    "scrud",
    "seduce",
    "semen",
    "seppo",
    "seppos",
    "septics",
    "sex",
    "sexcam",
    "sexed",
    "sexfarm",
    "sexhound",
    "sexhouse",
    "sexi",
    "sexing",
    "sexkitten",
    "sexo",
    "sexpot",
    "sexslave",
    "sextogo",
    "sextoy",
    "sextoys",
    "sexual",
    "sexually",
    "sexwhore",
    "sexx",
    "sexxi",
    "sexxx",
    "sexxxi",
    "sexxxy",
    "sexxy",
    "sexy",
    "sexymoma",
    "sexyslim",
    "sh!+",
    "sh!t",
    "sh1t",
    "sh1ter",
    "sh1ts",
    "sh1tter",
    "sh1tz",
    "shag",
    "shagger",
    "shaggin",
    "shagging",
    "shamedame",
    "sharmuta",
    "sharmute",
    "shat",
    "shav",
    "shaved beaver",
    "shaved pussy",
    "shavedbeaver",
    "shavedpussy",
    "shawtypimp",
    "sheeney",
    "shemale",
    "shhit",
    "shi+",
    "shibari",
    "shibary",
    "shinola",
    "shipal",
    "shit ass",
    "shit",
    "shit-ass",
    "shit-bag",
    "shit-bagger",
    "shit-brain",
    "shit-breath",
    "shit-cunt",
    "shit-dick",
    "shit-eating",
    "shit-face",
    "shit-faced",
    "shit-fit",
    "shit-head",
    "shit-heel",
    "shit-hole",
    "shit-house",
    "shit-load",
    "shit-pot",
    "shit-spitter",
    "shit-stain",
    "shitass",
    "shitbag",
    "shitbagger",
    "shitblimp",
    "shitbrain",
    "shitbreath",
    "shitcan",
    "shitcunt",
    "shitdick",
    "shite",
    "shiteater",
    "shiteating",
    "shited",
    "shitey",
    "shitface",
    "shitfaced",
    "shitfit",
    "shitforbrains",
    "shitfuck",
    "shitfucker",
    "shitfull",
    "shithapens",
    "shithappens",
    "shithead",
    "shitheel",
    "shithole",
    "shithouse",
    "shiting",
    "shitings",
    "shitlist",
    "shitload",
    "shitola",
    "shitoutofluck",
    "shitpot",
    "shits",
    "shitspitter",
    "shitstain",
    "shitt",
    "shitted",
    "shitter",
    "shitters",
    "shittiest",
    "shitting",
    "shittings",
    "shitty",
    "shity",
    "shitz",
    "shiz",
    "shiznit",
    "shortfuck",
    "shota",
    "shrimping",
    "shylock",
    "shylocks",
    "shyt",
    "shyte",
    "shytty",
    "shyty",
    "simp",
    "sissy",
    "sixsixsix",
    "sixtynine",
    "sixtyniner",
    "skag",
    "skanck",
    "skank",
    "skankbitch",
    "skankee",
    "skankey",
    "skankfuck",
    "skanks",
    "skankwhore",
    "skanky",
    "skankybitch",
    "skankywhore",
    "skeet",
    "skinflute",
    "skribz",
    "skullfuck",
    "skum",
    "skumbag",
    "skurwysyn",
    "skwa",
    "skwe",
    "slag",
    "slanteye",
    "slanty",
    "slapper",
    "sleezeball",
    "slideitin",
    "slimeball",
    "slimebucket",
    "slopehead",
    "slopeheads",
    "sloper",
    "slopers",
    "slopes",
    "slopey",
    "slopeys",
    "slopies",
    "slopy",
    "slut",
    "slutbag",
    "slutbucket",
    "slutdumper",
    "slutkiss",
    "sluts",
    "slutt",
    "slutting",
    "slutty",
    "slutwear",
    "slutwhore",
    "slutz",
    "smack",
    "smackthemonkey",
    "smeg",
    "smegma",
    "smoker",
    "smut",
    "smutty",
    "snatchpatch",
    "snigger",
    "sniggered",
    "sniggering",
    "sniggers",
    "snowback",
    "snowballing",
    "snownigger",
    "snuff",
    "socksucker",
    "sodom",
    "sodomise",
    "sodomite",
    "sodomize",
    "sodomy",
    "son of a bitch",
    "son of a whore",
    "son-of-a-bitch",
    "son-of-a-whore",
    "sonofabitch",
    "sonofbitch",
    "sooties",
    "sooty",
    "souse",
    "soused",
    "soyboy",
    "spac",
    "spade",
    "spades",
    "spaghettibender",
    "spaghettinigger",
    "spank",
    "spankthemonkey",
    "spastic",
    "spearchucker",
    "spearchuckers",
    "sperm",
    "spermacide",
    "spermbag",
    "spermhearder",
    "spermherder",
    "sphencter",
    "spic",
    "spick",
    "spicks",
    "spics",
    "spierdalaj",
    "spig",
    "spigotty",
    "spik",
    "spiks",
    "spitter",
    "splittail",
    "splooge",
    "spludge",
    "spooge",
    "spread legs",
    "spreadeagle",
    "spunk",
    "spunky",
    "sqeh",
    "squa",
    "squarehead",
    "squareheads",
    "squaw",
    "squinty",
    "squirting",
    "stagg",
    "steamy",
    "stfu",
    "stiffy",
    "stoned",
    "stoner",
    "strap on",
    "strapon",
    "strappado",
    "stringer",
    "strip club",
    "stripclub",
    "stroke",
    "stroking",
    "stuinties",
    "stupidfuck",
    "stupidfucker",
    "style doggy",
    "suckdick",
    "sucked",
    "sucker",
    "sucking",
    "suckme",
    "suckmyass",
    "suckmydick",
    "suckmytit",
    "suckoff",
    "sucks",
    "suicide girl",
    "suicide girls",
    "suicidegirl",
    "suicidegirls",
    "suka",
    "sultrywoman",
    "sultrywomen",
    "sumofabiatch",
    "swallower",
    "swalow",
    "swamp guinea",
    "swamp guineas",
    "swastika",
    "syphilis",
    "t i t",
    "t i ts",
    "t1t",
    "t1tt1e5",
    "t1tties",
    "taboo",
    "tacohead",
    "tacoheads",
    "taff",
    "take off your",
    "tar babies",
    "tar baby",
    "tarbaby",
    "tard",
    "taste my",
    "tastemy",
    "tawdry",
    "tea bagging",
    "teabagging",
    "teat",
    "teets",
    "teez",
    "terd",
    "terror",
    "terrorist",
    "teste",
    "testee",
    "testes",
    "testical",
    "testicle",
    "testicles",
    "testis",
    "thicklip",
    "thicklips",
    "thirdeye",
    "thirdleg",
    "threesome",
    "threeway",
    "throating",
    "thumbzilla",
    "thundercunt",
    "tied up",
    "tig ol bitties",
    "tig old bitties",
    "tight white",
    "timber nigger",
    "timber niggers",
    "timbernigger",
    "tinkle",
    "tit",
    "titbitnipply",
    "titfuck",
    "titfucker",
    "titfuckin",
    "titi",
    "titjob",
    "titlicker",
    "titlover",
    "tits",
    "titt",
    "tittie",
    "tittie5",
    "tittiefucker",
    "titties",
    "tittis",
    "titty",
    "tittyfuck",
    "tittyfucker",
    "tittys",
    "tittywank",
    "titwank",
    "tity",
    "to murder",
    "toke",
    "tongethruster",
    "tongue in a",
    "tongueina",
    "tonguethrust",
    "tonguetramp",
    "toots",
    "topless",
    "tortur",
    "torture",
    "tosser",
    "towel head",
    "towel heads",
    "towelhead",
    "trailertrash",
    "tramp",
    "trannie",
    "tranny",
    "transsexual",
    "transvestite",
    "trashy",
    "tribadism",
    "triplex",
    "trisexual",
    "trois",
    "trojan",
    "trots",
    "tub girl",
    "tubgirl",
    "tuckahoe",
    "tunneloflove",
    "turd burgler",
    "turnon",
    "tush",
    "tushy",
    "tw4t",
    "twat",
    "twathead",
    "twatlips",
    "twats",
    "twatty",
    "twatwaffle",
    "twink",
    "twinkie",
    "two girls one cup",
    "twobitwhore",
    "twunt",
    "twunter",
    "udge packer",
    "ukrop",
    "unclefucker",
    "undressing",
    "unfuckable",
    "upskirt",
    "uptheass",
    "upthebutt",
    "urethra play",
    "urethraplay",
    "urophilia",
    "usama",
    "ussys",
    "uzi",
    "v a g i n a",
    "v14gra",
    "v1gra",
    "v4gra",
    "va-j-j",
    "va1jina",
    "vag",
    "vag1na",
    "vagiina",
    "vaj1na",
    "vajina",
    "valium",
    "venus mound",
    "vgra",
    "vibr",
    "vibrater",
    "vibrator",
    "vigra",
    "violet wand",
    "virgin",
    "virginbreaker",
    "vittu",
    "vixen",
    "vjayjay",
    "vodka",
    "vomit",
    "vorarephilia",
    "voyeurweb",
    "voyuer",
    "vullva",
    "vulva",
    "w00se",
    "w0p",
    "wab",
    "wad",
    "wang",
    "wank",
    "wanker",
    "wanking",
    "wanky",
    "waysted",
    "wazoo",
    "weenie",
    "weewee",
    "weiner",
    "welcher",
    "wench",
    "wet dream",
    "wetb",
    "wetback",
    "wetbacks",
    "wetdream",
    "wetspot",
    "wh00r",
    "wh0re",
    "wh0reface",
    "whacker",
    "whash",
    "whigger",
    "whiggers",
    "whiskeydick",
    "whiskydick",
    "whit",
    "white power",
    "white trash",
    "whitenigger",
    "whitepower",
    "whites",
    "whitetrash",
    "whitey",
    "whiteys",
    "whities",
    "whoar",
    "whop",
    "whoralicious",
    "whore",
    "whorealicious",
    "whorebag",
    "whored",
    "whoreface",
    "whorefucker",
    "whorehopper",
    "whorehouse",
    "whores",
    "whoring",
    "wichser",
    "wigga",
    "wiggas",
    "wigger",
    "wiggers",
    "willie",
    "willies",
    "williewanker",
    "willy",
    "wog",
    "wogs",
    "woose",
    "wop",
    "worldsex",
    "wrapping men",
    "wrinkled starfish",
    "wtf",
    "wuss",
    "wuzzie",
    "x-rated",
    "x-rated2g1c",
    "xkwe",
    "xrated",
    "xtc",
    "xx",
    "xxx",
    "xxxxxx",
    "yank",
    "yaoi",
    "yarpie",
    "yarpies",
    "yeasty",
    "yed",
    "yellow showers",
    "yellowman",
    "yellowshowers",
    "yid",
    "yids",
    "yiffy",
    "yobbo",
    "yourboobs",
    "yourpenis",
    "yourtits",
    "yury",
    "zabourah",
    "zigabo",
    "zigabos",
    "zipperhead",
    "zipperheads",
    "zoophile",
    "zoophilia",
];


const socket = io();
let intervalID;

const canvasMaze = document.getElementById('maze');
const ctxMaze = canvasMaze.getContext('2d');
const canvas = document.getElementById('ball1');
const ctx = canvas.getContext('2d');

function move(element, direction, distance = 0) {
    if (distance != 0) {
        var topOrLeft = (direction == "left" || direction == "right") ? "left" : "top";
        if (direction == "up" || direction == "left") { distance *= -1; }
        var elStyle = window.getComputedStyle(element);
        var value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
        // console.log(value);
        element.style[topOrLeft] = (Number(value) + distance) + "px";
    }
}

var ball = document.getElementById("ball");

// let closest = [-1, -1];

let t = 1.0;
let gravity = 3000;
let bounciness = 2 / 10;
const RADIUS = 10;

let x0 = 110;
let y0 = 110;
let xf = 110;
let yf = 110;
let targetx = 0;
let targety = 0;

let v0x = 0;
let v0y = 0;
let vfx = 0;
let vfy = 0;

let ax = 0;
let ay = 0;

let b = 0;
let g = 0;

let maze;
let draw;
let cellSize;


let zone;

function first() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(15, 15, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();


    zone = new Array(canvasMaze.height + 1);
    for (let i = 0; i < canvasMaze.height + 1; i++) {
        zone[i] = new Array(canvasMaze.width + 1).fill(0);
    }
}
first()


function handleOrientation(event) {
    let beta = event.beta
    let gamma = event.gamma

    b = beta
    g = gamma

    b = Math.min(Math.max(beta, -60), 60);
    g = Math.min(Math.max(gamma, -60), 60);
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
        //console.log("not iOS");
        window.addEventListener('deviceorientation', handleOrientation)
    } else {
        //not supported
        alert('not supported')
    }
}
////////////////////////////////////////////////////////


function DrawMaze(Maze, ctx, cellsize) {
    //console.log("DrawMaze");
    var map = Maze.map();
    var cellSize = cellsize;
    var drawEndMethod;
    ctx.lineWidth = 2;

    this.redrawMaze = function (size) {
        cellSize = size;
        //ctx.lineWidth = cellSize / 50;
        drawMap();
        drawEndMethod();
    };

    function drawCell(xCord, yCord, cell) {
        var x = xCord * cellSize;
        var y = yCord * cellSize;

        if (cell.n == false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y);
            ctx.stroke();

            for (let i = x; i < x + cellSize; i++) {
                //console.log(i + " " + y);
                zone[i][y] = -1;
            }
        }
        if (cell.s === false) {
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();

            for (let i = x; i < x + cellSize; i++) {
                //console.log(i + " " + y + cellSize);
                zone[i][y + cellSize] = -1;
            }
        }
        if (cell.e === false) {
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();

            for (let i = y; i < y + cellSize; i++) {
                //console.log(x + cellSize + " " + i);
                zone[x + cellSize][i] = -1;
            }
        }
        if (cell.w === false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.stroke();

            for (let i = y; i < y + cellSize; i++) {
                //console.log(x + " " + i);
                zone[x][i] = -1;
            }
        }
    }

    function drawMap() {
        for (x = 0; x < map.length; x++) {
            for (y = 0; y < map[x].length; y++) {
                drawCell(x, y, map[x][y]);
            }
        }
    }

    function drawEndFlag() {
        var coord = Maze.endCoord;
        var gridSize = 4;
        var fraction = cellSize / gridSize - 2;
        var colorSwap = true;
        for (let y = 0; y < gridSize; y++) {
            if (gridSize % 2 == 0) {
                colorSwap = !colorSwap;
            }
            for (let x = 0; x < gridSize; x++) {
                ctx.beginPath();
                ctx.rect(
                    coord.x * cellSize + x * fraction + 4.5,
                    coord.y * cellSize + y * fraction + 4.5,
                    fraction,
                    fraction
                );
                if (colorSwap) {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                } else {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                }
                ctx.fill();
                colorSwap = !colorSwap;
            }
        }
    }

    function clear() {
        var canvasSize = cellSize * map.length;
        ctx.clearRect(0, 0, canvasSize, canvasSize);
    }

    drawEndMethod = drawEndFlag;
    clear();
    drawMap();
    drawEndMethod();
}


function makeMaze() {
    //console.log("makeMaze");
    difficulty = 10
    cellSize = canvasMaze.width / difficulty;

    zone = new Array(canvasMaze.height + 1);
    for (let i = 0; i < canvasMaze.height + 1; i++) {
        zone[i] = new Array(canvasMaze.width + 1).fill(0);
    }
    draw = new DrawMaze(maze, ctxMaze, cellSize);

    tx = maze.startCoord.x * cellSize + cellSize / 2;
    ty = maze.startCoord.y * cellSize + cellSize / 2;

    targetx = maze.endCoord.x * cellSize;
    targety = maze.endCoord.y * cellSize;

    xf = tx;
    yf = ty;

    deltaX = xf - x0 + 95;
    deltaY = yf - y0 + 95;
    if (deltaX < 0) {
        move(ball, "left", -1 * deltaX);
    }
    else {
        move(ball, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ball, "up", -1 * deltaY);
    }
    else {
        move(ball, "down", deltaY);
    }

    x0 = tx;
    y0 = ty;

    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.arc(x0, y0, 10, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.stroke();
}


/////////////////////////////////////////////////////////


function collided(xff, yff) {
    xff = Math.floor(xff);
    yff = Math.floor(yff);

    // closest = [-1, -1];
    // console.log(xff);
    // let disclosest = 1000000;

    for (let i = xff - RADIUS; i <= xff + RADIUS; i++) {
        for (let j = yff - RADIUS; j <= yff + RADIUS; j++) {

            let dis = ((xff - i) ** 2) + ((yff - j) ** 2)
            if (dis <= RADIUS ** 2) {
                // console.log(i);
                if (zone[i][j] == -1) {

                    // if (dis < disclosest){
                    //     disclosest = dis;
                    //     closest = [i, j];
                    //     // console.log(closest[1]);
                    // }
                    return true;
                }
            }
        }
    }
    // return closest;
    return false;
}


///////////////////////////////////////////////////////

function moving() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw = new DrawMaze(maze, ctxMaze, cellSize);

    ax = gravity * Math.sin(g * Math.PI / 180);
    ay = gravity * Math.sin(b * Math.PI / 180);

    vfx = v0x + ax * t / 1000.0;
    vfy = v0y + ay * t / 1000.0;
    ///////////////////////////////////////////////////////////////////////////////// send positions to server
    xf = x0 + v0x * t / 1000.0 + 0.5 * ax * (t / 1000) ** 2;
    yf = y0 + v0y * t / 1000.0 + 0.5 * ay * (t / 1000) ** 2;

    // if (xf >= targetx - 40 && xf <= targetx + 40) {
    //     if (yf >= targety - 40 && yf <= targety + 40) {
    //     }
    // }

    // if (xf < RADIUS) {
    //     xf = RADIUS;
    //     vfx = -vfx * bounciness;
    // } else if (xf > canvas.width - RADIUS) {
    //     xf = canvas.width - RADIUS;
    //     vfx = -vfx * bounciness;
    // }
    // if (yf < RADIUS) {
    //     yf = RADIUS;
    //     vfy = -vfy * bounciness;
    // } else if (yf > canvas.height - RADIUS) {
    //     yf = canvas.height - RADIUS;
    //     vfy = -vfy * bounciness;
    // }

    // collided(xf, yf);

    // if (closest != [-1, -1]){
    //     // console.log("Collided");
    //     // distX = xf - closest[0];
    //     // distY = yf - closest[1];
    //     // let dist = Math.sqrt((distX)**2 + (distY)**2);

    //     // let angX = Math.acos(Math.abs(distX)/dist);
    //     // let angY = Math.asin(Math.abs(distY)/dist);

    //     // xf = x0 + distX;
    //     // yf = y0 + distY;

    //     // vfx = -vfx * bounciness * Math.abs(angX);
    //     // vfy = -vfy * bounciness * Math.abs(angY);

    // }

    let collisionx = collided(xf, y0);
    let collisiony = collided(x0, yf);
    let collisionxy = collided(xf, yf);

    if (collisionx && !collisiony) {
        xf = x0;
        vfx = -vfx * bounciness;
    }
    else if (!collisionx && collisiony) {
        yf = y0;
        vfy = -vfy * bounciness;
    }
    else if (collisionxy) {
        xf = x0;
        yf = y0;
        let temp = vfx;
        vfx = -Math.sign(vfx) * Math.abs(vfy) * bounciness;
        vfy = -Math.sign(vfy) * Math.abs(temp) * bounciness;
    }





    // console.log("Here");
    // console.log(xf);
    deltaX = xf - x0;
    deltaY = yf - y0;
    if (deltaX < 0) {
        move(ball, "left", -1 * deltaX);
    }
    else {
        move(ball, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ball, "up", -1 * deltaY);
    }
    else {
        move(ball, "down", deltaY);
    }

    v0x = vfx;
    v0y = vfy;
    x0 = xf;
    y0 = yf;

    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.arc(xf, yf, RADIUS, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(xf, yf, RADIUS, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // // ctx.fillStyle = "rgba(0, 0, 255, 1.0)";
    // ctx.fill();

    //socket.emit("updateHost", { ctx });

    if ((targetx < xf && xf < targetx + cellSize) && (targety < yf && yf < targety + cellSize)) {
        window.alert("Won");
        socket.emit('Won', document.getElementById("gameID").value);
        clearInterval(intervalID);
        return;
    }

    // console.log(g); 
}

intervalID = setInterval(moving, t);

//moving()









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

function checkUserName(username) {
    if (inappropriateUsernames.includes(username))
        return false;
    else {
        return true;
    }

}

function checkSpaces(username) {
    if (username.indexOf(' ') >= 0)
        return false
    else {
        return true
    }
}


function DrawMaze(Maze, ctx, cellsize) {
    //console.log("DrawMaze");
    var map = Maze.map;
    //var map = Maze[map];
    var cellSize = cellsize;
    var drawEndMethod;
    ctx.lineWidth = 2;

    this.redrawMaze = function (size) {
        cellSize = size;
        //ctx.lineWidth = cellSize / 50;
        drawMap();
        drawEndMethod();
    };

    function drawCell(xCord, yCord, cell) {
        var x = xCord * cellSize;
        var y = yCord * cellSize;

        if (cell.n == false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y);
            ctx.stroke();

            for (let i = x; i < x + cellSize; i++) {
                //console.log(i + " " + y);
                zone[i][y] = -1;
            }
        }
        if (cell.s === false) {
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();

            for (let i = x; i < x + cellSize; i++) {
                //console.log(i + " " + y + cellSize);
                zone[i][y + cellSize] = -1;
            }
        }
        if (cell.e === false) {
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();

            for (let i = y; i < y + cellSize; i++) {
                //console.log(x + cellSize + " " + i);
                zone[x + cellSize][i] = -1;
            }
        }
        if (cell.w === false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.stroke();

            for (let i = y; i < y + cellSize; i++) {
                //console.log(x + " " + i);
                zone[x][i] = -1;
            }
        }
    }

    function drawMap() {
        for (x = 0; x < map.length; x++) {
            for (y = 0; y < map[x].length; y++) {
                drawCell(x, y, map[x][y]);
            }
        }
    }

    function drawEndFlag() {
        var coord = Maze.endCoord;
        var gridSize = 4;
        var fraction = cellSize / gridSize - 2;
        var colorSwap = true;
        for (let y = 0; y < gridSize; y++) {
            if (gridSize % 2 == 0) {
                colorSwap = !colorSwap;
            }
            for (let x = 0; x < gridSize; x++) {
                ctx.beginPath();
                ctx.rect(
                    coord.x * cellSize + x * fraction + 4.5,
                    coord.y * cellSize + y * fraction + 4.5,
                    fraction,
                    fraction
                );
                if (colorSwap) {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                } else {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                }
                ctx.fill();
                colorSwap = !colorSwap;
            }
        }
    }

    function clear() {
        var canvasSize = cellSize * map.length;
        ctx.clearRect(0, 0, canvasSize, canvasSize);
    }

    drawEndMethod = drawEndFlag;
    clear();
    drawMap();
    drawEndMethod();
}


function makeMaze() {
    //console.log("makeMaze");
    difficulty = 10
    cellSize = canvasMaze.width / difficulty;

    zone = new Array(canvasMaze.height + 1);
    for (let i = 0; i < canvasMaze.height + 1; i++) {
        zone[i] = new Array(canvasMaze.width + 1).fill(0);
    }
    draw = new DrawMaze(maze, ctxMaze, cellSize);

    tx = maze.startCoord.x * cellSize + cellSize / 2;
    ty = maze.startCoord.y * cellSize + cellSize / 2;

    targetx = maze.endCoord.x * cellSize;
    targety = maze.endCoord.y * cellSize;

    xf = tx;
    yf = ty;

    deltaX = xf - x0 + 95;
    deltaY = yf - y0 + 95;
    if (deltaX < 0) {
        move(ball, "left", -1 * deltaX);
    }
    else {
        move(ball, "right", deltaX);
    }
    if (deltaY < 0) {
        move(ball, "up", -1 * deltaY);
    }
    else {
        move(ball, "down", deltaY);
    }

    x0 = tx;
    y0 = ty;

    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.arc(x0, y0, 10, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.stroke();
}

const joinForm = document.getElementById("joinForm");

joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const gameID = document.getElementById("gameID").value;


    if (!checkUserName(username)) {
        simplePop("error", `Error - inappropriate username`);
    }
    else if (!checkSpaces(username)) {
        simplePop("error", `Error - no spaces allowed`);

    }
    else {

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
                    simplePop("error", `Error: ${results.Message}`);
                }
                else {
                    // const socket = io();
                    socket.emit("joinGame", { username, gameID });

                    socket.on("playerJoined", ({ username }) => {
                        // alert(`${username} has joined the game!`);
                        simplePop("success", `${username} has joined the game!`);
                        document.getElementById('joinbtn').style.display = 'none';
                    });

                    username.value = '';
                    gameID.value = '';

                    socket.on('startGameForPlayers', (maze2) => {
                        console.log("Maze: ", maze2);
                        maze = maze2;
                        makeMaze();
                        // window.location.href = '/play';
                        document.getElementById("map").style.display = 'block';
                        document.getElementById("join-game-main").style.display = 'none';
                    })

                    //receive updatedd ball positions:
                    socket.on("updateBalls", ({ player1 }) => {
                        const player1Ball = document.querySelector("#ball1");
                        player1Ball.style.left = player1.x;
                        player1Ball.style.top = player1.y;
                    })
                }

            }
        }

        request.setRequestHeader('Content-Type', 'application/json')
        request.send(JSON.stringify(jsonData));

    }

});