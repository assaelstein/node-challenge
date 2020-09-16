const { tables, connection } = require("../../config").mysql;
const { connect, addRow } = require("../../utils").mysql;

const createOrg = async (input) => {
  const newInput = { ...input, id: require("uniqid")("org_") };
  const db = connect(connection);
  const result = await addRow(db, tables.orgs.name, newInput, true);
  return result[0][0];
};

module.exports = createOrg;
