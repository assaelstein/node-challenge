const dbConn = require('./connect')

const addEntry = async (tableName, input) => {
    try {
        const inputColumn = Object.keys(input).map((i) => {
            return `${i}`
        })
        // console.log('columns:', inputColumn)
        const inputValues = Object.values(input).map((i) => {
            return `'${i}'`
        })
        // console.log('inputValues:', inputValues)

        // console.log(
        //     `INSERT INTO ${tableName}(${inputColumn}) VALUES (${inputValues})`,
        // )

        const result = await dbConn
            .promise()
            .query(`INSERT INTO ${tableName}(${inputColumn}) VALUES (${inputValues})`)

        return result

    } catch (e) {

        console.log('error with add!!')
        throw e
    }
}

module.exports = addEntry
