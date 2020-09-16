const mysql = require("mysql2");

const connect = (connection) => {
  return mysql.createConnection(connection);
};

module.exports = connect;
