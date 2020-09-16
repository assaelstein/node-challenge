const { tables, connection } = require("../../config").mysql;
const { connect, deleteRow } = require("../../utils").mysql;

const deleteSite = async (id) => {
  const db = connect(connection);
  await deleteRow(db, tables.sites.name, id);
};

module.exports = deleteSite;
