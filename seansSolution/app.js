const setupDB = require("./setupDB");
const { group, org, site } = require("./modules");
const { breakConsole, logTestOutput } = require("./common").functions;

let group1;
let groupForOrg;
let org1;
let orgForSite;
let site1;
let site2;

const runGroupTests = async () => {
  group1 = await group.createGroup({ name: "RTT", reference: "001" });
  groupForOrg = await group.createGroup({
    name: "MASSMART",
    reference: "mm001",
  });
  logTestOutput("Create Groups", !!group1.id);

  group1 = await group.updateGroup({
    id: group1.id,
    name: "MASSMART",
    reference: "MM",
  });
  logTestOutput(
    "Update Group",
    group1.name === "MASSMART" && group1.reference === "MM"
  );

  const gottenGroup = await group.getGroup(group1.id);
  logTestOutput("Get Group", gottenGroup.id === group1.id);

  await group.deleteGroup(group1.id);
  const deleteCheck = await group.getGroup(group1.id);
  logTestOutput("Delete Group", !deleteCheck);
};

const runOrgTests = async () => {
  org1 = await org.createOrg({
    groupId: groupForOrg.id,
    name: "MAKRO",
    reference: "002",
  });
  orgForSite = await org.createOrg({
    groupId: groupForOrg.id,
    name: "MAKRO",
    reference: "002",
  });
  logTestOutput("Create Orgs", !!org1.id);

  org1 = await org.updateOrg({
    id: org1.id,
    name: "MAKRO STORES",
    reference: "MM",
  });
  logTestOutput(
    "Update Org",
    org1.name === "MAKRO STORES" && org1.reference === "MM"
  );

  const gottenOrg = await org.getOrg(org1.id);
  logTestOutput("Get Org", gottenOrg.id === org1.id);

  const gottenOrgs = await org.getGroupOrgs(groupForOrg.id);
  logTestOutput("Get Group Orgs", gottenOrgs.length === 2);

  await org.deleteOrg(org1.id);
  const deleteCheck = await org.getOrg(org1.id);
  logTestOutput("Delete Org", !deleteCheck);
};

const runSiteTests = async () => {
  site1 = await site.createSite({
    orgId: orgForSite.id,
    name: "MAKRO WOODMEAD",
    reference: "WM",
  });
  site2 = await site.createSite({
    orgId: orgForSite.id,
    name: "MAKRO GERMISTON",
    reference: "GM",
  });
  logTestOutput("Create Sites", !!site1.id);

  site1 = await site.updateSite({
    id: site1.id,
    name: "MAKRO WOODMEAD CENTRE",
    reference: "WM-C",
  });
  logTestOutput(
    "Update Site",
    site1.name === "MAKRO WOODMEAD CENTRE" && site1.reference === "WM-C"
  );

  const gottenSite = await site.getSite(site1.id);
  logTestOutput("Get Site", gottenSite.id === site1.id);

  const gottenSites = await site.getOrgSites(orgForSite.id);
  logTestOutput("Get Group Sites", gottenSites.length === 2);

  await site.deleteSite(site1.id);
  const deleteCheck = await site.getSite(site1.id);
  logTestOutput("Delete Site", !deleteCheck);
};

const runTests = async () => {
  await setupDB();
  breakConsole();
  console.log("GROUP TESTS");
  await runGroupTests();
  breakConsole();
  console.log("ORG TESTS");
  await runOrgTests();
  breakConsole();
  console.log("SITE TESTS");
  await runSiteTests();
  breakConsole();
  console.log("END TEST SUITE");
};

runTests();
