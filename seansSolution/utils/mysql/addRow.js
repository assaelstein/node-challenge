const getRowById = require("./getRowById");

const addRow = async (connection, tableName, input, returnRow = false) => {
  const sql = `INSERT INTO \`${tableName}\`
  (${Object.keys(input)
    .map((i) => `\`${i}\``)
    .join(", ")})
    VALUES
    (${Object.values(input)
      .map((i) => `"${i}"`)
      .join(", ")})
  `;
  await connection.promise().query(sql);
  if (returnRow) {
    const result = await getRowById(connection, tableName, input.id);
    return result;
  }
  return true;
};

module.exports = addRow;
