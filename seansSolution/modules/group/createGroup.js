const { tables, connection } = require("../../config").mysql;
const { connect, addRow } = require("../../utils").mysql;

const createGroup = async (input) => {
  const newInput = { ...input, id: require("uniqid")("group_") };
  const db = connect(connection);
  const result = await addRow(db, tables.groups.name, newInput, true);
  return result[0][0];
};

module.exports = createGroup;
