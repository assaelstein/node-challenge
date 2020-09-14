const db = require("../connect/mySqlConnect");

const createOrg = async (
  name1,
  reference1,
  name2,
  reference2,
  name3,
  reference3
) =>{
  const instructions = "INSERT INTO Org1 (Name, Reference) VALUES ?";
  const orgValues = [
    [name1, reference1],
    [name2, reference2],
    [name3, reference3],
  ];

  try {
    await db.promise().query("USE DB1");
    const org = await db.promise().query(instructions, [orgValues]);
    return "org table created!";
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = createOrg;
