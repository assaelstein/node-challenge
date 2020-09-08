const db = require("./mySQLConnect");

const createGroup = async () => {
  const instructionsCG =
    "CREATE TABLE GroupTable (name VARCHAR(255), reference VARCHAR(255))";

  try {
    await db.promise().query(instructionsCG);
    console.log("Group created successfully.");
  } catch (e) {
    console.log(e);
  }
};

module.exports = createGroup;
