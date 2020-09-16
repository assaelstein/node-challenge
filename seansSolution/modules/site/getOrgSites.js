const { tables, connection } = require("../../config").mysql;
const { connect } = require("../../utils").mysql;

const getOrgSites = async (orgId) => {
  const db = connect(connection);
  const result = await db.promise().query(`
  SELECT * FROM \`${tables.sites.name}\`
  WHERE \`${tables.sites.fields.orgId[0]}\` = "${orgId}"
  `);
  return result[0];
};

module.exports = getOrgSites;
