const getRowById = require("./getRowById");

const updateRow = async (
  connection,
  tableName,
  id,
  input,
  returnRow = false
) => {
  const sql = `UPDATE \`${tableName}\`
SET ${Object.keys(input)
    .map((i) => `\`${i}\` = "${input[i]}"`)
    .join(", ")}
    WHERE \`id\` = "${id}"
  `;
  await connection.promise().query(sql);
  if (returnRow) {
    const result = await getRowById(connection, tableName, id);
    return result;
  }
  return true;
};

module.exports = updateRow;
