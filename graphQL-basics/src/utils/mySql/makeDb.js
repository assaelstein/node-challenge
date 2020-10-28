const { mySqlConnectionSpecs } = require('../../config')
const { dissoc } = require('ramda')
const dbConn = require('./connect')

const createDB = async () => {
  try {
    // const newSpecs = dissoc('database', mySqlConnectionSpecs)
    // console.log(newSpecs)
    const createDb = await dbConn.promise().query(
        // "create database good2"
      `CREATE DATABASE ${mySqlConnectionSpecs.database}`
    )
    // console.log('DB created!:',createDb)

    console.log(`DB ${mySqlConnectionSpecs.database} created!!`)
  } catch (e) {
    console.log(`DB: '${mySqlConnectionSpecs.database}' already exists!` )
  }
}

module.exports = createDB
