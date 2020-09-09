const db = require("./mySQLConnect");

const dropDBandMake = async (dbName) => {
  const instructionDrop = "DROP DATABASE " + dbName;
  const instructionMake = "CREATE DATABASE " + dbName;
  const deleteDB = await db.promise().query(instructionDrop);
  const makeDB = await db.promise().query(instructionMake);
  return "DB dropped and succesfully re-created!";
};

module.exports = dropDBandMake;
