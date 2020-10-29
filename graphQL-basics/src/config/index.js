module.exports = {
  mySqlConnectionSpecs: {
    host: '127.0.0.1',
    port: '32769',
    user: 'root',
    password: 'openSesame',
    database: 'graphql',
  },
  tables: {
    Users: {
      name: 'Users',
      fields: {
        id: `id varchar(255)`,
        name: `name varchar(255)`,
        email: `email varchar(255)`,
      },
    },
    Comments: {
      name: 'Comments',
      fields: {
        id: `id varchar(255)`,
        comment: `comment varchar(255)`,
        author: `author varchar(255)`,
        post: `post varchar(255)`
      },
    },
    Posts: {
      name: 'Posts',
      fields: {
        id: `id varchar(255)`,
        name: `name varchar(255)`,
        email: `email varchar(255)`,
        body: `body varchar(255)`,
        author: `author varchar(255)`,
        published: `published varchar(255)`
      },
    },
  },
}
