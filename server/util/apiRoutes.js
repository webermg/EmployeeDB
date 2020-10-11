const express = require("express");
const router = express.Router();
const db = require("./db");
const queries = require("./queries")

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

//DB REF????


// ===============================================================================
// ROUTING
// ===============================================================================


  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  //get all query
  router.get("/api/table/:t", function(req, res) {
    queries.getAllFromTable(req.params.t).then((result) => res.send(result)).catch(err => res.send(err));
  });

  router.get("/api/table/:t/col/:c/val/:v", function(req, res) {
    queries.getAllWhere(req.params.t,req.params.c,req.params.v).then((result) => res.send(result)).catch(err => res.send(err));
  });

  router.get("/api/test", function(req, res) {
    queries.getRoles().then((result) => res.send(result)).catch(err => res.send(err));
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  router.post("/api/roles", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    res.send("NYI");
  });

  router.delete("/api/departments", function(req, res) {
    //true if delete success, false otherwise
    res.send("NYI");
  })

  module.exports = router;