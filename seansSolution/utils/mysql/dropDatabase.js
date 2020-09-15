const dropDatabase = async (connection, dbName) => {
  await connection.promise().query(`DROP DATABASE IF EXISTS ${dbName}`);
};

module.exports = dropDatabase;
