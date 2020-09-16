const chalk = require("chalk");
const db = require("../connect/mySqlConnect");

const makeDB = async () => {
  // you're only using these variables in one other place
  // So rather just push the string straight into line 13 and 14 and you don't need these 2 lines.
  const instruction1 = "DROP DATABASE IF EXISTS DB1";
  const instruction2 = "CREATE DATABASE IF NOT EXISTS DB1"; //don't need IF NOT EXISTS here because of first query

  try {
    //there's unnecessary whitespace here

    await db.promise().query(instruction1);
    const makeDB2 = await db.promise().query(instruction2);

    //not sure what this is achieving, I would just console.log
    //at the end of the function. Based on the 2 queries the
    //db will always be made. Or else an error will be thrown
    if (makeDB2[0].affectedRows > 0) {
      console.log(chalk.green.underline("Database made!"));
    }
  } catch (e) {
    console.log(e);
    //throw will log the error as well so you don't need a console.log
    throw e;
  }
};

module.exports = makeDB;
