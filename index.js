var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "thisismySQLpassword!",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Add deparment",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update role",
          "Delete deparment",
          "Delete role",
          "Delete employee"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Add deparment":
          addDepartment();
          break;
  
        case "Add role":
          addRole();
          break;
  
        case "Add employee":
          addEmployee();
          break;
  
        case "View departments":
          viewDepartments();
          break;
  
        case "View roles":
          viewRoles();
          break;

        case "View employees":
          viewEmployees();
          break;

        case "Update role":
          updateRole();
          break;
        
        case "Update employee":
          updateEmployee();
          break;        
        
        case "Delete deparment":
          deleteDepartment();
          break;
          
        case "Delete role":
          deleteRole();
          break;

        case "Delete employee":
          deleteEmployee();
          break;
        }
      });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department you are adding?"
      },
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function(err) {
          if (err) throw err;
        //   console.log("Department created succesfully.");
          start();
        }
      );
    });
}

function viewDepartments() {
    console.log("Viewing all departments...\n");
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
}

function deleteDepartment() {
    inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department you wish to delete?"
      },
    ])
    .then(function(answer) {
      connection.query(
        "DELETE FROM department WHERE ?",
        {
          name: answer.name,
        },
        function(err) {
          if (err) throw err;
        //   console.log("Department deleted succesfully.");
          start();
        }
      );
    });
}

function updateRole() {

}