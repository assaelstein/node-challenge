const connection = require('./connect')
const { dessoc } = require('ramda')
const { mySqlConnectionSpecs, tables } = require('../../config')

const createTables = async () => {
  try {
    const promises = Object.values(tables).map((i) => {
      const newInput = dessoc('tableName', i)
      connection().promise().query(`CREATE TABLE ${i.tableName} (${newInput})`)
    })

    const result = await Promise.all(promises)
    console.log(result)
    return result
  } catch (e) {
    console.log(e)
  }
}

module.exports = createTables
