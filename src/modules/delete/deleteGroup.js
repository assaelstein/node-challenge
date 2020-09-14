const chalk = require("chalk");
const db = require("../connect/mySqlConnect");

const deleteGroup = async (entryToDelete) => {
  const instructionsDB = "USE DB1";
  const instructions1 =
    "DELETE FROM Group1 WHERE name = " + "'" + entryToDelete + "'";

  try {
    await db.promise().query(instructionsDB);
    const update1 = await db.promise().query(instructions1);

    if (update1[0].affectedRows > 0) {
      console.log(chalk.red("Entry deleted from group table"));
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = deleteGroup;
