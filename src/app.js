const createGroup = require("./modules/createGroup");
const createSite = require("./modules/createSite");
const createOrg = require("./modules/createOrg");
const updateOrg = require("./modules/updateOrg");
const searchDB = require("./modules/createDB.js");
const dropandMakeDB = require("./modules/dropDB");

const dbName = "Trackmatic";

searchDB(dbName)
  .then((res) => {
    if (res === 1) {
      console.log(
        "this DB name already exists, proceeding to drop it and create new with same name"
      );
      dropandMakeDB(dbName)
        .then((res) => {
        console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("DB with name: " + dbName + " created ");
    }
  })
  .catch((e) => {
    console.log(e);
  });

