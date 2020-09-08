const db = require("./mySQLConnect.js");

const updateOrg = async () => {
  const instructionsUO =
    "UPDATE" + tableName + "SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  try {
    const update = await db.promise().query(instructionsUO);
    console.log(update);
    console.log("updated Successfully");
  } catch (e) {
    console.log("Error! ");
    console.log(e);
  }
};

exports.module = updateOrg;
