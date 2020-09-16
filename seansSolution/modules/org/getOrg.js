const { tables, connection } = require("../../config").mysql;
const { connect, getRowById } = require("../../utils").mysql;

const getOrg = async (id) => {
  const db = connect(connection);
  const result = await getRowById(db, tables.orgs.name, id);
  return result[0][0];
};

module.exports = getOrg;
