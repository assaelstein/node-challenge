const mySqlConnectionSpecs = {
    host: '127.0.0.1',
    port: '32773',
    user: 'root',
    password: 'openSesame',
    database: 'graphql',
}

const tables = [
    Users: {

    {
        tableName: 'Users',
        id: `id varchar(255),`,
        name: `name varchar(255),`,
        email: `email varchar(255),`,
        content: `content varchar(255),`,
        body: `body varchar(255),`,
    },}
]

module.exports = { mySqlConnectionSpecs, tables }
