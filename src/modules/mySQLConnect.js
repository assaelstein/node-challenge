const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1", //"localhost" 127.0.0.1
  port: "32773",
  user: "root", // root is the host for the DB not the mac
  database: "sys", //this has not yet been created, how to create a DB
  password: "P@ssw0rd", //needs to be the real PW
});



//*************************************************************************************** */

//*************************************************************************************** */
// const chalk = require("chalk");

// db.promise()
//   .connect()
//   .then(() => {
//     console.log(chalk.blue.underline("Connected to the mySQL sever"));
//   })
//   .catch((err) => {
//     console.log("Error!");
//     console.log(err);
//   });

// /////////////

module.exports = db;
