const { tables, connection } = require("../../config").mysql;
const { connect, getRowById } = require("../../utils").mysql;

const getGroup = async (id) => {
  const db = connect(connection);
  const result = await getRowById(db, tables.groups.name, id);
  return result[0][0];
};

module.exports = getGroup;
