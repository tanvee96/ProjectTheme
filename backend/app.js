"use strict";
var express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser");

require("dotenv").config();

const routes = require("./routes/api");
const dbConnector = require("./config/dbConnection");
const path = require("path");
const app = express();

dbConnector.init(app);
app.use(cors());
app.use("/public", express.static("public"));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname,'./web/build')));
// app.use(/^(?!\/api)/i,(req,res)=> res.sendFile(path.join(__dirname,"./web/build",'index.html')))

routes.init(app);

app.use(function (err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.status(500);
  res.json({
    message: err,
  });
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server Started on PORT No. 5000")
);

module.exports = app;
