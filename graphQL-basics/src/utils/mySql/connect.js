const mysql = require('mysql2')


const connection = async (connectionSpecs) => {

    mysql.promise().createConnectin(connectionSpecs)


}



module.exports = connection