const { tables, connection } = require("../../config").mysql;
const { connect, deleteRow } = require("../../utils").mysql;

const deleteOrg = async (id) => {
  const db = connect(connection);
  await deleteRow(db, tables.orgs.name, id);
};

module.exports = deleteOrg;
