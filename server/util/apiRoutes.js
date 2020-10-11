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
    queries.test(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });

  

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  router.post("/api/dept", function(req, res) {
    queries.postNewDept(req.body.name).then((result) => res.send(true)).catch(err => res.send(err));
  });

  router.post("/api/role", function(req, res) {
    queries.postNewRole(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });

  router.post("api/employee", function(req, res) {
    queries.postNewEmployee(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });



  router.put("/api/employee", function(req, res) {
    queries.updateEmployee(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });
  
  router.put("/api/role", function(req, res) {
    queries.updateRole(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });
  
  router.put("/api/dept", function(req, res) {
    queries.updateDepartment(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });

  module.exports = router;