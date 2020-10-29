const dbConn = require('./connect')

const getEntry = async (columns, tableName) => {
    // console.log(`SELECT ${columns} FROM ${tableName}`)

    const result = await dbConn
        .promise()
        .query(`SELECT ${columns} FROM ${tableName}`)

    // console.log(result[0][0])

    return result[0][0]
}

module.exports = getEntry
