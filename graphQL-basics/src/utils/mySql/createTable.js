const dbConn = require('./connect')
const { dissoc } = require('ramda')
const { mySqlConnectionSpecs, tables } = require('../../config')

const createTables = async () => {
  try {
    const array = Object.values(tables).map((tab) => {

      const result = Object.values(tab.fields)
      console.log(result)

      const tableTest = dbConn.promise().query(`CREATE TABLE IF NOT EXISTS ${tab.name} (${result})`)

      return result


    })

  } catch (e) {

    console.log(`table already exists!`)
  }
}

module.exports = createTables
