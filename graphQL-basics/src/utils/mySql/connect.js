const mysql = require('mysql2')


const connection = async (connectionSpecs) => {

    const connect = mysql.promise().createConnectin(connectionSpecs)

    return connect
}



module.exports = connection