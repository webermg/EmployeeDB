const connection = require("./db");
const fs = require("fs");
const path = require("path");

//view paths
const viewEmployeePath = path.join(__dirname,"../../db/view/allempq.sql");
const viewRolesPath = path.join(__dirname,"../../db/view/allroleq.sql");
const viewDeptPath = path.join(__dirname,"../../db/view/alldeptq.sql");

const addEmployeePath = path.join(__dirname,"../../db/insert/AddEmp.sql");
const addRolePath = path.join(__dirname,"../../db/insert/addRole.sql");
const addDepartmentPath = path.join(__dirname,"../../db/insert/addDept.sql");


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

  //test
  test: function(title,salary,department) {
    return new Promise(function(resolve,reject) {
      connection.query("INSERT INTO roles (title, salary, department_id) VALUES(?,?,(SELECT id FROM departments WHERE name=?));", [title,salary,department], function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  postNewDept: function(deptName) {
    return new Promise(function(resolve,reject) {
      connection.query(fs.readFileSync(addDepartmentPath,"utf-8"), {name: deptName}, function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  postNewRole: function(req) {
    return new Promise(function(resolve,reject) {
      connection.query(fs.readFileSync(addRolePath,"utf-8"), [req.title,req.salary,req.deptName], function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  postNewEmployee: function(require) {
    return new Promise(function(resolve,reject) {
      connection.query(fs.readFileSync(addEmployeePath,"utf-8"), [req.empFirst,req.empLast,req.title,req.mgrFirst,req.mgrLast], function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

}

module.exports = queries;