var mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "dbpassword",
  database: "tri",
  dateStrings: "date",
});

module.exports = db;
