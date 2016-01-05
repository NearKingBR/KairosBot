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

//Runs first time setup if it is the first run.
if (dbExists == false) {
    firstRun.fRun();
}