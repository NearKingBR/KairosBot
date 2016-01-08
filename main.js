//Imports the node.js module fs. This is the file system module.
var fs = require("fs");

//Import SQLite3.
var sqlite3 = require("sqlite3").verbose();

//Checks if discordie is set up correctly.
try {
    var discordie = require("discordie");
} catch (e) {
    console.log("Please run npm install and ensure it passes with no errors!");
    process.exit();
}

//Checks for all the corecode.
try {
    var firstRun = require("./corecode/firstrun");
} catch (e) {
    console.log("You are missing some of the core code of the bot, please make sure that you installed the bot correctly.")
}

//Checks if this is the first run of the bot.
var dbFile = "KairosBotConfig.db";
var dbExists = fs.existsSync(dbFile);

//Sets the reference for the config database.
var db = new sqlite3.Database(dbFile);

//Retrieving the login info from the database and setting auth to the info. It then calls the login function.
function startAuth() {
    db.each("SELECT email, password FROM Login", function (err, row) {
        auth = row;
        login()
        return;
    });
}

//Runs first time setup if it is the first run.
if (dbExists == false) {
    firstRun.fRun();
} else {
    firstRun.fRun(startAuth);
}

//Define the auth variable which will be used to login later.
var auth;

//Defining variables that make discordie easier to reference.
var client = new discordie();
var Dispatcher = client.Dispatcher;
var Events = discordie.Events;




//This function handles logging into the given discord account.
function login() {
    console.log("Logging in");
    client.connect(auth);
    Dispatcher.on(discordie.Events.DISCONNECTED, (e) => {
        console.log("Failed to login. The login servers may be down or the login info given is incorrect.");
    });
    Dispatcher.on(discordie.Events.GATEWAY_READY, (e) => {
        console.log("Logged in.");
    });
}

Dispatcher.on(Events.MESSAGE_CREATE, (e) => {
    console.log("new message: ");
    console.log(JSON.stringify(e.message, null, "  "));
    console.log("e.message.content: " + e.message.content);

    var guild = e.message.guild;
    var channel = e.message.channel;
    var member = e.message.member;
    function onError(e) {
        if (!e) return console.error("Unknown error");

        if(e.response && e.response.error)
            return console.error(e.response.error);

        console.error(e.toString());
    }

    if(e.message.content == "!ping") {
        e.message.channel.sendMessage("pong");
    }
});