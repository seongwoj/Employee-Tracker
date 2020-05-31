var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

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
        message: "Welcome to the HR Database Management System. What would you like to do?",
        choices: [
          "Add deparment",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Delete department",
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
        
        case "Update employee role":
          updateEmployeeRole();
          break;

        case "Delete department":
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

// Function for adding department into database
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department you are adding?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function(err) {
          if (err) throw err;
          console.log("Department added succesfully.");
          start();
        }
      );
    });
}

// Function for adding role into database
function addRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of the role you are adding?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the role you are adding?"
        },
        {
            name: "departmentID",
            type: "input",
            message: "What is the department ID of the role you are adding?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentID
          },
          function(err) {
            if (err) throw err;
            console.log("Role added succesfully.");
            start();
          }
        );
      });
}

// Function for adding employee into database
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee you are adding?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the employee you are adding?"
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the role ID of the employee you are adding?"
      },
      {
        name: "managerID",
        type: "input",
        message: "If any, what is the manager ID of the employee's manager?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id:answer.roleID,
          manager_id: answer.managerID
        },
        function(err) {
          if (err) throw err;
          console.log("Employee added succesfully.");
          start();
        }
      );
    });
}

// Function to view departments
function viewDepartments() {
    console.log("Viewing all departments...\n");
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
}

// Function to view roles
function viewRoles() {
    console.log("Viewing all roles...\n");
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
}

// Function to view employees
function viewEmployees() {
    console.log("Viewing all employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
}

// Function to update employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "employeeID",
        type: "input",
        message: "Please provide the ID of the employee to update."
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the new role ID of the employee?"
      },
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
            {
                role_id: answer.roleID
            },
            {
                id: answer.employeeID
            }
        ],
        function(err) {
          if (err) throw err;
          console.log("Employee role updated succesfully.");
          start();
        }
      );
    });
}

// Function for deleting department from database
function deleteDepartment() {
    inquirer
      .prompt([
        {
          name: "departmentID",
          type: "input",
          message: "What is the ID of the department to delete?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "DELETE FROM department WHERE ?",
          {
            id: answer.departmentID,
          },
          function(err) {
            if (err) throw err;
            console.log("Department deleted succesfully.");
            start();
          }
        );
      });
}

// Function for deleting role from database
function deleteRole() {
    inquirer
      .prompt([
        {
          name: "roleID",
          type: "input",
          message: "What is the ID of the role to delete?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "DELETE FROM role WHERE ?",
          {
            id: answer.roleID,
          },
          function(err) {
            if (err) throw err;
            console.log("Role deleted succesfully.");
            start();
          }
        );
      });
}

// Function for deleting employee from database
function deleteEmployee() {
    inquirer
      .prompt([
        {
          name: "employeeID",
          type: "input",
          message: "What is the ID of the employee to delete?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "DELETE FROM employee WHERE ?",
          {
            id: answer.employeeID,
          },
          function(err) {
            if (err) throw err;
            console.log("Employee deleted succesfully.");
            start();
          }
        );
      });
}