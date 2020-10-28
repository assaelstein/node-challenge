const mysql = require('mysql2')
const { dissoc } = require('ramda')
const { mySqlConnectionSpecs } = require('../../config')

// const connect = (connectSpecs = mySqlConnectionSpecs) => {

const newIput = dissoc('database', mySqlConnectionSpecs)

//     const conn = mysql.createConnection(newInput1)
//     console.log(conn)
//     return conn
// }
const dbConn= mysql.createConnection(newIput)



module.exports =dbConn //connect
