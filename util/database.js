const mysql = require('mysql2')
const dbConfig = require('../config/DB_Config.json')

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  password: dbConfig.password
});
connection.connect()

module.exports = connection