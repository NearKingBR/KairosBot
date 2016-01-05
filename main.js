//Imports the node.js module fs. This is the file system module.
var fs = require("fs");

//Import prompt module
var prompt = require("prompt");

//Import SQLite3.
var sqlite3 = require("sqlite3").verbose();

//Checks if discordie is set up correctly.
try {
    var discordie = require("discordie");
} catch (e) {
    console.log("Please run npm install and ensure it passes with no errors!");
    process.exit();
}

//Checks if this is the first run of the bot.
var dbFile = "KairosBotConfig.db";
var dbExists = fs.existsSync(dbFile);

//Sets the reference for the config database.
var db = new sqlite3.Database(dbFile);

//Runs first time setup if it is the first run.
if (dbExists == false) {



    //Creates login table.
    db.serialize(function () {
        if (!dbExists) {
            db.run("CREATE TABLE Login (Name TEXT) (Value TEXT)");
        }
    });

    //Start the prompt.
    prompt.start();

    //Create variables for the email and password.
    var botEmail = null;
    var botPassword = null;

    //Set up bot login info.
    console.log("Enter the login info for the bot. WARNING: The password is not protected in any way, do not give out the KairosBotConfig.db file to anyone or else they will have the password.");
    prompt.get(["Email", "Password"], function (err, result) {
        botEmail = result.Email;
        botPassword = result.Password;
    });

    var stmt = db.prepare("INSERT INTO Login (Name, Value) VALUES ('Email', botEmail)");
    var stmt = db.prepare("INSERT INTO Login (Name, Value) VALUES ('Password', botPassword)");

    stmt.finalize();

    db.close();
}