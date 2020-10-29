const dbConn = require('./connect')


const getEntry = async () =>{


dbConn.promise().query(`SELECT ${fields}`)


}



module.exports =