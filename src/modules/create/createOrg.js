const chalk = require("chalk");
const db = require("../connect/mySqlConnect");

const createOrg = async (
  name1,
  reference1,
  name2,
  reference2,
  name3,
  reference3
) => {
  const instructions = "INSERT INTO Org1 (Name, Reference) VALUES ?";
  const orgValues = [
    [name1, reference1],
    [name2, reference2],
    [name3, reference3],
  ];

  try {
    await db.promise().query("USE DB1");
    const org = await db.promise().query(instructions, [orgValues]);
    if (org[0].affectedRows > 0) {
      console.log(chalk.bgBlue("org created!"));
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = createOrg;
