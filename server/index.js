// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var mysql = require("mysql");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + ".." + "public")));

routes
require("./util/apiRoutes")(app);
require("./util/htmlRoutes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

