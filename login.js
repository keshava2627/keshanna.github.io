const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO users_table (username, password) VALUES (?, ?)";

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "User registered successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
