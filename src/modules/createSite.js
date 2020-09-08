const db = require("./mySQLConnect");

const createSite = async () => {
  const instructionsCS =
    "CREATE TABLE SiteTable (name VARCHAR(255), reference VARCHAR(255))";

  try {
    await db.promise().query(instructionsCS);
    console.log("Site created successfully.");
  } catch (e) {
    console.log(e);
  }
};

module.exports = createSite;
