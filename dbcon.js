var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_castimat',
  password        : 'xxxx',
  database        : 'cs290_castimat',
  dateStrings     : true 
});

module.exports.pool = pool;
