const mysql = require("mysql2");
const { connection } = require("../../config").mysql;

const connectWithDatabase = (database) => {
  return mysql.createConnection({ ...connection, database });
};

module.exports = connectWithDatabase;
