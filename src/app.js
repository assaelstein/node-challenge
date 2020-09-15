const makeDB = require("./modules/db/makeDb.js");
const tables = require("./modules/tables/table");
const create = require("./modules/create");
const read = require("./modules/read/read");
const update = require("./modules/update");
const deleteEntries = require("./modules/delete/");

const putTogether = async () => {
  try {
    await makeDB();
    await tables();
    await create.createGroup("A", "B", "C", "D", "E");
    await create.createOrg("A", "B", "C", "D", "E");
    await create.createSite("A", "B", "C", "D", "E");
    await read();
    await update.updateGroup("zzz", "770", "E");
    await update.updateOrg("Checkers", "784", "E");
    await update.updateSite("FoodLovers", "89443", "C");
    await read();
    await deleteEntries.deleteGroup("A");
    await deleteEntries.deleteOrg("Checkers");
    await deleteEntries.deleteSite("FoodLovers");
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
