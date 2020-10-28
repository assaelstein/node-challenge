const mysql = require('mysql2')
const { dissoc } = require('ramda')
const { mySqlConnectionSpecs } = require('../../config')


const newIput = dissoc('database', mySqlConnectionSpecs)


const dbConn= mysql.createConnection(newIput)



module.exports =dbConn 
