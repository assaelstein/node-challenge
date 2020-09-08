const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1", //"localhost"
  user: "root", // root is the host for the DB not the mac
  database: "challenge_0.0", //this has not yet been created, how to create a DB
  password: "Track2020!", //needs to be the real PW
});

//*************************************************************************************** */
// this (below) will be DELETED prior to submmission, will be don via kitematic and docker
//*************************************************************************************** */
const chalk = require("chalk");

db.promise()
  .connect()
  .then(() => {
    console.log(chalk.blue.underline("Connected to the mySQL sever"));
  })
  .catch((err) => {
    console.log("Error!");
    console.log(err);
  });

/////////////

module.exports = db;
