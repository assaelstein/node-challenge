const mysql = require('mysql2')
const { mySqlConnectionSpecs } = require('../../config')


const connection = async (connectSpecs = mySqlConnectionSpecs) => {


    const connect = mysql.promise().createConnection(connectSpecs)

    return connect
}



module.exports = connection