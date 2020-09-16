const makeDB = require("./modules/db/makeDb.js");
const tables = require("./modules/tables/table");
const create = require("./modules/create");
const read = require("./modules/read/read");
const update = require("./modules/update");
const deleteEntries = require("./modules/delete/");

//Well done for figuring out the async await. This is exactly how we do it.

const putTogether = async () => {
  try {
    await makeDB();
    await tables();
    await create.createGroup("A", "B", "C", "D", "E"); //see below comments
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

/*
  Good first go! Well done!
  The folders are structured nicely and it's a clean app

  POINTS TO WORK ON:

  There's a great deal of hardcoding done here and it makes the functionality rigid.
  For example the createGroup accepts a bunch of parameters. Rather, it should accept
  an object with data.
  so createGroup should receive an object {
    name: "RTT",
    reference:"RTT0012"
  }
  or something to that effect.
  This allows you to easily add / remove fields from the schema.
  For example what if I wanted to add a field "country" in the group table?
  Now you need to accept another parameter etc.
  Rather we work with objects to allow different payloads.

  WORK with objects. Practice it extensively. Objects are how we pass through data.

  TABLE STRUCTURE:
Each table of data must have a unique ID as a field. Here I've seen you've used Name
but there should always be an id field for each schema.
  */
