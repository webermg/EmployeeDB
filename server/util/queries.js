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

const updateEmployeePath = path.join(__dirname,"../../db/update/updEmp.sql");
const updateRolePath = path.join(__dirname,"../../db/update/updRole.sql");
const updateDepartmentPath = path.join(__dirname,"../../db/update/updDept.sql");


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

  getAllFromColumn: function(table, column) {
    return new Promise(function(resolve,reject) {
      connection.query("SELECT ?? FROM ??", [column,table], function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  //test
  test: function() {
    return new Promise(function(resolve,reject) {
      connection.query(`SELECT CONCAT(first_name,' ',last_name) as name FROM employee_db.employees;`, function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },


  //======================================>
  //========POST QUERIES==================>
  //======================================>

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

  postNewEmployee: function(req) {
    return new Promise(function(resolve,reject) {
      connection.query(fs.readFileSync(addEmployeePath,"utf-8"), [req.empFirst,req.empLast,req.title,req.mgrFirst,req.mgrLast], function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  //======================================
  //            UPDATE QUERIES
  //======================================

  updateEmployee: function(req) {
    return new Promise(function(resolve,reject) {
      connection.query(fs.readFileSync(updateEmployeePath,"utf-8"), [req.mgrFirst,req.mgrLast,req.empFirst,req.empLast,req.title,req.id], function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  
  updateRole: function(req) {
    return new Promise(function(resolve,reject) {
      connection.query(fs.readFileSync(updateRolePath,"utf-8"), [req.title,req.salary,req.deptName,req.id], function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  
  updateDepartment: function(req) {
    return new Promise(function(resolve,reject) {
      connection.query(fs.readFileSync(updateDepartmentPath,"utf-8"), [req.name,req.id], function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  //======================================
  //            DELETE QUERIES
  //======================================

  deleteEmployee: function(id) {
    return deleteFromTable("employees",id);
  },
  
  deleteRole: function(id) {
    return deleteFromTable("roles",id);
  },
  
  deleteDepartment: function(id) {
    return deleteFromTable("departments",id);
  }
}

deleteFromTable = (table,id) => {
  return new Promise(function(resolve,reject) {
    connection.query("DELETE from ?? WHERE id=?;", [table,id], function(err, res) {
      if (err) reject(err);
      resolve(res);
    });
  });
}

module.exports = queries;