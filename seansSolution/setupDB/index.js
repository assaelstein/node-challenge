require("dotenv").config();
const {
  dropDatabase,
  createDatabase,
  connectWithoutDatabase,
  connectWithDatabase,
  createTable,
} = require("../utils").mysql;
const { tables } = require("../config").mysql;

const breakConsole = () => {
  console.log("\n--------------------------------\n");
};

const setupDatabase = async (dbName) => {
  const conn = connectWithoutDatabase();
  breakConsole();
  console.log("Setting up Database...");
  breakConsole();
  console.log(`Creating Database ${dbName}...`);
  await dropDatabase(conn, dbName);
  await createDatabase(conn, dbName);
  console.log(`Database ${dbName} Created!`);
  breakConsole();
  conn.end();
  const connDb = connectWithDatabase(dbName);
  console.log("Creating Tables...");
  const promises = Object.values(tables).map((table) =>
    createTable(connDb, table)
  );
  await Promise.all(promises);
  console.log("Created Tables!");
  breakConsole();
  console.log("Set up Database!");
};

module.exports = setupDatabase;
