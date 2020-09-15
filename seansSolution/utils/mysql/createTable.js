const createTable = async (connection, tableData) => {
  const fieldsString = Object.keys(tableData.fields)
    .map((field) =>
      (tableData.primaryKey === field
        ? tableData.fields[field].concat(["PRIMARY KEY"])
        : tableData.fields[field]
      ).join(" ")
    )
    .join(", ");
  return await connection
    .promise()
    .query(
      `CREATE TABLE IF NOT EXISTS \`${tableData.name}\` (${fieldsString})`
    );
};

module.exports = createTable;
