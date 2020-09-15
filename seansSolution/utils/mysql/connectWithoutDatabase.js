const mysql = require("mysql2");
const { connection } = require("../../config").mysql;

const connectWithoutDatabase = () => {
  return mysql.createConnection(connection);
};

module.exports = connectWithoutDatabase;
