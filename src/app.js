const makeDB = require("./modules/db/makeDb.js");
const tables = require("./modules/tables/table");
const createGroup = require("./modules/create/createGroup");
const createOrg = require("./modules/create/createOrg");
const createSite = require("./modules/create/createSite");
const read = require("./modules/read/read");
const updateGroup = require("./modules/update/updateGroup");
const updateOrg = require("./modules/update/updateOrg");
const updateSite = require("./modules/update/updatesite");
const deleteGroup = require("./modules/delete/deleteGroup");
const deleteOrg = require("./modules/delete/deleteOrg");
const deleteSite = require("./modules/delete/deleteSite");

const putTogether = async () => {
  try {
    await makeDB();
    await tables();
    await createGroup("A", "B", "C", "D", "E");
    await createOrg("A", "B", "C", "D", "E");
    await createSite("A", "B", "C", "D", "E");
    await read();
    await updateGroup("zzz", "770", "E");
    await updateOrg("Checkers", "784", "E");
    await updateSite("FoodLovers", "89443", "C");
    await read();
    await deleteGroup("A");
    await deleteOrg("Checkers");
    await deleteSite("FoodLovers");
    await read();
  } catch (e) {
    return e;
  }
};

putTogether()
  .then(() => {})
  .catch((e) => {
    console.log(e);
  });
