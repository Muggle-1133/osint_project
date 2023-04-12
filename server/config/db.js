var mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ycdc2021!",
  database: "tri",
  dateStrings: "date",
});

module.exports = db;
