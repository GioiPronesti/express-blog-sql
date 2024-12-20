const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "first_blog",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connessione riuscita");
});

module.exports = connection;
