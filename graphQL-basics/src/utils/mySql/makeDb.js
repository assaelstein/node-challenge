const { mySqlConnectionSpecs } = require('../../config')
const { dissoc } = require('ramda')
const dbConn = require('./connect')

const createDB = async () => {
  try {

    await dbConn.promise().query(
      `CREATE DATABASE ${mySqlConnectionSpecs.database};`
    )
    await dbConn.promise().query(`USE ${mySqlConnectionSpecs.database}`)

    console.log(`DB ${mySqlConnectionSpecs.database} created!!`)
  } catch (e) {
    // console.log(`DB: '${mySqlConnectionSpecs.database}' already exists!`)
    await dbConn.promise().query(`USE ${mySqlConnectionSpecs.database}`)
  }
}

module.exports = createDB
