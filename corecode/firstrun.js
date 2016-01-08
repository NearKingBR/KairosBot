module.exports = {

fRun: function (callback) {

    //Import SQLite3.
    var sqlite3 = require("sqlite3").verbose();

    //Import Readline.
    var readline = require("readline");

    //Allows use of main.js.


    //Set up readline.
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //Define the database.
    var db = new sqlite3.Database("KairosBotConfig.db");

    //Creates login table.
    db.serialize(function () {
        db.run("CREATE TABLE Login (email TEXT, password TEXT)");
    });

    //Create variables for the email and password.
    var botEmail = "temp";
    var botPassword = "temp";

    //Set up bot login info.
    console.log("Enter the login info for the bot. WARNING: The password is not protected in any way, do not give out the KairosBotConfig.db file to anyone or else they will have the password.");
    rl.question("Email: ", (answer) => {
        botEmail = answer;
        rl.question("Password: ", (answer) => {
            botPassword = answer;
            rl.close();
            inputInfo();
        });
    });

    //Inputs the given login info into the database to be used to login.
    function inputInfo() {
        var stmt = db.prepare("INSERT INTO Login (email, password) VALUES (?, ?)");
        stmt.run(botEmail, botPassword);
        stmt.finalize();

        db.close();
    }

    callback();

    }

};