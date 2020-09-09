const db = require("./mySQLConnect");

const searchforDB = async (dbName) => {
  const instructions1 = "CREATE DATABASE IF NOT EXISTS " + dbName;

  try {
    const showDB = await db.promise().query(instructions1);
    const dbexists = showDB[0].warningStatus;
    return dbexists;
  } catch (e) {
    console.log(e);
  }
};

module.exports = searchforDB;
