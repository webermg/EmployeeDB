// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/../public")));

//routes
const htmlRoutes = require("./util/htmlRoutes");
const apiRoutes = require("./util/apiRoutes");
app.use(htmlRoutes);
app.use(apiRoutes);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

