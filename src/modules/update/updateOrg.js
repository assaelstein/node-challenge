const chalk = require("chalk");
const db = require("../connect/mySqlConnect");

const updateOrg = async (newName, newReference, currentName) => {
  const instructionsDB = "USE DB1";
  const instructions1 =
    "UPDATE Org1 SET Name = " +
    "'" +
    newName +
    "'" +
    ", Reference = " +
    "'" +
    newReference +
    "'" +
    " WHERE Name = " +
    "'" +
    currentName +
    "'";

  try {
    await db.promise().query(instructionsDB);
    const update1 = await db.promise().query(instructions1);
    if (update1[0].changedRows > 0) {
      console.log(chalk.bgWhite.black("Org table updated!"));
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = updateOrg;
