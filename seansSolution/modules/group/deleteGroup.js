const { tables, connection } = require("../../config").mysql;
const { connect, deleteRow } = require("../../utils").mysql;

const deleteGroup = async (id) => {
  const db = connect(connection);
  await deleteRow(db, tables.groups.name, id);
};

module.exports = deleteGroup;
