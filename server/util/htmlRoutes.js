// ===============================================================================
// DEPENDENCIES
// ===============================================================================
const express = require("express");
const router = express.Router();
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================


  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  router.get("/charts", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/charts.html"));
  });

  router.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/view.html"));
  });

  router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
  });

  module.exports = router;
