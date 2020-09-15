const createDatabase = async (connection, dbName) => {
  await connection.promise().query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
};

module.exports = createDatabase;
