const getRowById = async (connection, tableName, id) => {
  const sql = `SELECT * FROM \`${tableName}\`
  WHERE \`id\`="${id}"
  `;
  const result = await connection.promise().query(sql);
  return result;
};

module.exports = getRowById;
