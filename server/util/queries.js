const connection = require("./db");

const queries = {
  getAllFromTable: function(table) { 
    return new Promise(function(resolve,reject) {
      connection.query("SELECT * FROM ??", table, function(err, res) {
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
  }
}

module.exports = queries;