const { tables, connection } = require("../../config").mysql;
const { connect } = require("../../utils").mysql;

const getGroupOrgs = async (groupId) => {
  const db = connect(connection);
  const result = await db.promise().query(`
  SELECT * FROM \`${tables.orgs.name}\`
  WHERE \`${tables.orgs.fields.groupId[0]}\` = "${groupId}"
  `);
  return result[0];
};

module.exports = getGroupOrgs;
