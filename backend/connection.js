const express = require("express");

const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Babith@1234",
  database: "renewable_energy_project",
});

db.connect((error) => {
  if (error) {
    console.log(error);
  }
  console.log("Connected to database");
});



db.query("select * from admin", (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});


module.exports = db;