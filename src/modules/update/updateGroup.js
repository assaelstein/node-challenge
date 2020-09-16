const chalk = require("chalk");
const db = require("../connect/mySqlConnect");

const updateGroup = async (newName, newReference, currentName) => {
  //what if I don't want to push in a reference? Ie I just want to update the name?
  //What if there's a new field in the group?
  const instructionsDB = "USE DB1";
  const instructions1 =
    "UPDATE Group1 SET Name = " +
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
      console.log(chalk.bgWhite.black("Group updated!"));
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = updateGroup;
