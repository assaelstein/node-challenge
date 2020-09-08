const db = require("./mySQLConnect");

const createOrg = async () => {
    const instructionsCO =
      "CREATE TABLE OrgTable (name VARCHAR(255), reference VARCHAR(255))";

//   const TN = "OrgTable";
//   const instructionsCO =
//     "CREATE TABLE" + TN + "(name VARCHAR(255), reference VARCHAR(255))";

  try {
    await db.promise().query(instructionsCO);
    console.log("Org created successfully.");
  } catch (e) {
    console.log(e);
  }
};

module.exports = createOrg;
