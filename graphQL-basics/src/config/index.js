const mySqlConnectionSpecs = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    //password: 'P@ssw0rd',
    //database: 'superman',
}

const tables = [

    {
        tableName: 'Users',
        id: `id varchar(255)`,
        name: `name varchar(255)`,
        email: `email varchar(255)`,
        content: `content varchar(255)`,
        body: `body varchar(255)`,
    }
]

module.exports = { mySqlConnectionSpecs, tables }
