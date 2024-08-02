const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "login",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

// Endpoint to retrieve all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users_table";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
