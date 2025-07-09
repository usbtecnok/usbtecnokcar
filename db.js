const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',     // exemplo: 'root'
  password: '@#*Z4939ia4',   // exemplo: 'minhasenha'
  database: 'usbtecnokcar'// exemplo: 'usbtecnokcar'
});

module.exports = pool.promise();
