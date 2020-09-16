const chalk = require("chalk");
const db = require("../connect/mySqlConnect");

const read = async () => {
  const instructionG = "SELECT * FROM Group1";
  const instructionO = "SELECT * FROM Org1";
  const instructionS = "SELECT * FROM Site1";

  try {
    await db.promise().query("USE DB1");

    const readG = await db.promise().query(instructionG);
    //again, you don't need variabeles on lines 5,6,7 just to use them one.
    const readO = await db.promise().query(instructionO);

    const readS = await db.promise().query(instructionS);

    console.log(chalk.blue.underline("contents of Group table: "));
    console.log(readG[0]);
    console.log(chalk.blue.underline("contents of Org table: "));
    console.log(readO[0]);
    console.log(chalk.blue.underline("contents of Site table: "));
    console.log(readS[0]);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = read;
