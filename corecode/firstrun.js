module.exports = {

fRun: function () {

    //Import SQLite3.
    var sqlite3 = require("sqlite3").verbose();

    //Define the database.
    var db = new sqlite3.Database("KairosBotConfig.db");

    //Creates login table.
    db.serialize(function () {
        db.run("CREATE TABLE Login (Name TEXT, Value TEXT)");
    });

    //Create variables for the email and password.
    var botEmail = "temp";
    var botPassword = "temp";

    //Set up bot login info.
    console.log("Enter the login info for the bot. WARNING: The password is not protected in any way, do not give out the KairosBotConfig.db file to anyone or else they will have the password.");


    var stmt = db.prepare("INSERT INTO Login (Name, Value) VALUES ('Email', ?)");
    stmt.run(botEmail);
    stmt.finalize();
    var stmt = db.prepare("INSERT INTO Login (Name, Value) VALUES ('Password', ?)");
    stmt.run(botPassword);
    stmt.finalize();

    db.close();
    }

};