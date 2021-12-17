const mysql = require("mysql2/promise");
const {v4: uuid} = require("uuid");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "megak_todo",
  namedPlaceholders: true,
});

module.exports = {
  pool,
  uuid,
}
