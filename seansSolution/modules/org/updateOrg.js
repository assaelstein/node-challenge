const { dissoc } = require("ramda");
const { tables, connection } = require("../../config").mysql;
const { connect, updateRow } = require("../../utils").mysql;

const updateOrg = async (input) => {
  const { id } = input;
  const newInput = dissoc("id", input);
  const db = connect(connection);
  const result = await updateRow(db, tables.orgs.name, id, newInput, true);
  return result[0][0];
};

module.exports = updateOrg;
