const connection = require("./db");

const queries = {
  getData: function() { 
    

    return new Promise(function(resolve,reject) {
      connection.query("SELECT * FROM employees", function(err, res) {
        if (err) throw err;
        console.table(res);
        resolve(res);
      });
    });



    
  }
}

module.exports = queries;