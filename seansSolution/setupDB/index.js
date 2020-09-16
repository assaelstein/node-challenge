require("dotenv").config();
const { dissoc } = require("ramda");
const {
  dropDatabase,
  createDatabase,
  connect,
  createTable,
} = require("../utils").mysql;
const { tables, connection } = require("../config").mysql;
const { breakConsole } = require("../common").functions;

const setupDatabase = async () => {
  const dbName = connection.database;
  const conn = connect(dissoc("database", connection));
  try {
    breakConsole();
    console.log("Setting up Database...");
    breakConsole();
    console.log(`Creating Database ${dbName}...`);
    await dropDatabase(conn, dbName);
    await createDatabase(conn, dbName);
    console.log(`Database ${dbName} Created!`);
    breakConsole();
  } catch (e) {
    throw new Error(e);
  } finally {
    conn.end();
  }
  const connDb = connect(connection);
  try {
    console.log("Creating Tables...");
    const promises = Object.values(tables).map((table) =>
      createTable(connDb, table)
    );
    await Promise.all(promises);
    console.log("Created Tables!");
    breakConsole();
    console.log("Set up Database!");
  } catch (e) {
    throw new Error(e);
  } finally {
    connDb.end();
  }
};

module.exports = setupDatabase;
