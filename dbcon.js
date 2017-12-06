var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_castimat',
  password        : 'xxxx',
  database        : 'cs340_castimat',
  dateStrings     : true 
});

module.exports.pool = pool;
