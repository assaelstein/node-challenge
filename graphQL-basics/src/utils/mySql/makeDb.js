const { mySqlConnectionSpecs } = require('../../config')
const { dissoc } = require('ramda')
const connection = require('./connect')


const createDB = async () => {
    const newSpecs = dissoc('database', mySqlConnectionSpecs)
    console.log(newSpecs)

    const createDb = await connection().promise().query(`CREATE DATABASE ${mySqlConnectionSpecs.user}`)
    console.log(createDb)

    console.log(`DB ${mySqlConnectionSpecs.database} created!!`)


}

module.exports = createDB
