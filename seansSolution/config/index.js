module.exports = {
  mysql: {
    connection: {
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
    tables: {
      groups: {
        name: "groups",
        primaryKey: "id",
        fields: {
          id: ["id", "VARCHAR(255)"],
          name: ["name", "VARCHAR(255)"],
          reference: ["reference", "VARCHAR(255)"],
        },
      },
      orgs: {
        name: "orgs",
        primaryKey: "id",
        fields: {
          id: ["id", "VARCHAR(255)"],
          groupId: ["groupId", "VARCHAR(255)", "NOT NULL"],
          name: ["name", "VARCHAR(255)"],
          reference: ["reference", "VARCHAR(255)"],
        },
      },
      sites: {
        name: "sites",
        primaryKey: "id",
        fields: {
          id: ["id", "VARCHAR(255)"],
          orgId: ["orgId", "VARCHAR(255)", "NOT NULL"],
          name: ["name", "VARCHAR(255)"],
          reference: ["reference", "VARCHAR(255)"],
        },
      },
    },
  },
};
