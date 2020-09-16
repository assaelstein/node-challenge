const deleteRow = async (connection, tableName, id) => {
  const sql = `DELETE FROM \`${tableName}\`
  WHERE \`id\`="${id}"
  `;
  await connection.promise().query(sql);
};

module.exports = deleteRow;
