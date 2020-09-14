const chalk = require("chalk");
const db = require("../connect/mySqlConnect");

const makeDB = async () => {
  const instruction1 = "DROP DATABASE IF EXISTS DB1";
  const instruction2 = "CREATE DATABASE IF NOT EXISTS DB1";

  try {
    await db.promise().query(instruction1);
    const makeDB2 = await db.promise().query(instruction2);
    
    if (makeDB2[0].affectedRows > 0) {
      console.log(chalk.green.underline("Database made!"));
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = makeDB;
