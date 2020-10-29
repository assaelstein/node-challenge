const connect = require('./connect')
const makeDb = require('./makeDb')
const createTables = require('./createTable')
const addEntry = require('./addEntry')

const setUpDbandTables = async () => {
  try {
    console.log('setting up!')
    // await connect
    await makeDb()
    await createTables()
  } catch (e) {
    console.log(e)
  }
}

module.exports = { setUpDbandTables, addEntry }
