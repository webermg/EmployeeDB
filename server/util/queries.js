const connection = require("./db");
const fs = require("fs");
const path = require("path");

//view paths
const viewEmployeePath = path.join(__dirname,"../../db/view/allempq.sql");
const viewRolesPath = path.join(__dirname,"../../db/view/allroleq.sql");
const viewDeptPath = path.join(__dirname,"../../db/view/alldeptq.sql");

const addEmployeePath = path.join(__dirname,"../../db/view/alldeptq.sql");
const addRolePath = path.join(__dirname,"../../db/view/alldeptq.sql");
const addDepartmentPath = path.join(__dirname,"../../db/view/alldeptq.sql");


const queries = {
  getAllFromTable: function(table) { 
    let sql;
    if(table === "employees") sql = fs.readFileSync(viewEmployeePath,"utf-8");
    if(table === "roles") sql = fs.readFileSync(viewRolesPath,"utf-8");
    if(table === "departments") sql = fs.readFileSync(viewDeptPath,"utf-8");
    return new Promise(function(resolve,reject) {
      connection.query(sql, function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getAllWhere: function(table, column, value) {
    return new Promise(function(resolve,reject) {
      connection.query("SELECT * FROM ?? WHERE ?? = ?", [table,column,value], function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getRoles: function() {
    return new Promise(function(resolve,reject) {
      connection.query("SELECT roles.salary,roles.title,departments.name FROM roles,departments WHERE roles.department_id=departments.id;", function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}

module.exports = queries;