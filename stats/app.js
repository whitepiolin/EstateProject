const express = require("express");
const routes = require("./routes");
const http = require("http");
const mysql = require("mysql");
const statsTable = require("./routes/statstable.js");
const app = express();
const connection = require("express-myconnection");

app.set("view engine", "ejs");
app.use(express.json());
app.use(
  connection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "000000",
      port: 3306,
      database: "realestatemarket"
    },
    "pool"
  )
);
app.get("./views/table.ejs", statsTable.list);
app.use(app.router);
http.createServer(app).listen(app.get(3000), function() {
  console.log("Express server listening on port " + app.get(3000));
});
