const dbConn = require('./connect')
const { dissoc } = require('ramda')
const { mySqlConnectionSpecs, tables } = require('../../config')

const createTables = async () => {
  try {
    const promises = Object.values(tables).map((i) => {
      const newInput = dissoc('tableName', i)
      console.log('i:',i)
      console.log(`CREATE TABLE ${i.tableName} (${newInput})`)
     dbConn.promise().query(`CREATE TABLE ${i.tableName} (${newInput})`)
    })

    const result = await Promise.all(promises)
    console.log(result)
    return result
  } catch (e) {
    console.log(e)
  }
}

module.exports = createTables
