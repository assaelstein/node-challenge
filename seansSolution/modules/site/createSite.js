const { tables, connection } = require("../../config").mysql;
const { connect, addRow } = require("../../utils").mysql;

const createSite = async (input) => {
  const newInput = { ...input, id: require("uniqid")("site_") };
  const db = connect(connection);
  const result = await addRow(db, tables.sites.name, newInput, true);
  return result[0][0];
};

module.exports = createSite;
