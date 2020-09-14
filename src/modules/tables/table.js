const chalk = require("chalk");
const db = require("../connect/mySqlConnect");

const tables = async () => {
  const instructionsDB = "USE DB1";
  const instructionsG =
    "CREATE TABLE IF NOT EXISTS Group1 (Name VARCHAR(255), Reference VARCHAR(255))";
  const instructionsO =
    "CREATE TABLE IF NOT EXISTS Org1 (Name VARCHAR(255), Reference VARCHAR(255))";
  const instructionsS =
    "CREATE TABLE IF NOT EXISTS Site1 (Name VARCHAR(255), Reference VARCHAR(255))";

  try {
    await db.promise().query(instructionsDB);
    const tableG = await db.promise().query(instructionsG);
    const tableO = await db.promise().query(instructionsO);
    const tableS = await db.promise().query(instructionsS);

    console.log(chalk.bgGreen.black("Org, site and group tables created!"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = tables;
