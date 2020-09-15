const setupDB = require("./setupDB");
const dbName = "seansDB";

const runTests = async () => {
  await setupDB(dbName);
};

runTests();
