const express = require("express");
const router = express.Router();
const db = require("./db");
const queries = require("./queries")

// ===============================================================================
// ROUTING
// ===============================================================================


  // API GET Requests
  // ---------------------------------------------------------------------------

  router.get("/api/table/:table", function(req, res) {
    queries.getAllFromTable(req.params.table).then((result) => res.send(result)).catch(err => res.send(err));
  });

  router.get("/api/table/:table/col/:col/", function(req, res) {
    queries.getAllFromColumn(req.params.table,req.params.col).then((result) => res.send(result)).catch(err => res.send(err));
  });

  router.get("/api/fullNames", function(req, res) {
    queries.getFullNames().then((result) => res.send(result)).catch(err => res.send(err));
  });

  router.get("/api/salarybydept", function(req, res) {
    queries.getSalariesByDept().then((result) => res.send(result)).catch(err => res.send(err));
  });
  
  router.get("/api/empsbymgr", function(req, res) {
    queries.getEmployeesByManager().then((result) => res.send(result)).catch(err => res.send(err));
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  router.post("/api/dept", function(req, res) {
    queries.postNewDept(req.body.name).then((result) => res.send(true)).catch(err => res.send(err));
  });

  router.post("/api/role", function(req, res) {
    queries.postNewRole(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });

  router.post("/api/employee", function(req, res) {
    queries.postNewEmployee(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });

  // API PUT Requests
  // ---------------------------------------------------------------------------

  router.put("/api/employee", function(req, res) {
    queries.updateEmployee(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });
  
  router.put("/api/role", function(req, res) {
    queries.updateRole(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });
  
  router.put("/api/dept", function(req, res) {
    queries.updateDepartment(req.body).then((result) => res.send(true)).catch(err => res.send(err));
  });

  // API DELETE Requests
  // ---------------------------------------------------------------------------

  router.delete("/api/employee/:id", function(req, res) {
    queries.deleteEmployee(req.params.id).then((result) => res.send(true)).catch(err => res.send(false));
  });
  
  router.delete("/api/role/:id", function(req, res) {
    queries.deleteRole(req.params.id).then((result) => res.send(true)).catch(err => res.send(false));
  });
  
  router.delete("/api/dept/:id", function(req, res) {
    queries.deleteDepartment(req.params.id).then((result) => res.send(true)).catch(err => res.send(false));
  });

  module.exports = router;