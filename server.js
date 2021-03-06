// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
      console.log("Listening on port %s", PORT);
    });
  });

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);