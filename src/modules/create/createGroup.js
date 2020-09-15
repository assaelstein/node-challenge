const chalk = require("chalk");
const db = require("../connect/mySqlConnect");

const createGroup = async (
  name1,
  reference1,
  name2,
  reference2,
  name3,
  reference3
) => {
  const instructions = "INSERT INTO Group1 (Name, Reference) VALUES ?";
  const groupValues = [
    [name1, reference1],
    [name2, reference2],
    [name3, reference3],
  ];

  try {
    await db.promise().query("USE DB1");
    const group = await db.promise().query(instructions, [groupValues]);

    if (group[0].affectedRows > 0) {
      console.log(chalk.bgBlue("group created!"));
    }

    return "Org table created!";
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = createGroup;
