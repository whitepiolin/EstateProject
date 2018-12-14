const mysql      = require('mysql');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '258654Ss.',
  database : 'realestatemarket',
  port: 3306
});

exports.module = connection;