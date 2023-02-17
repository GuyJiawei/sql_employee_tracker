// Importing the required packages/modules
// Package to connect with MySQL database
const mysql = require("mysql2");
// Package for creating command line interfaces
const inquirer = require('inquirer');
// Package for creating web applications
const express = require('express');
// Package for loading environment variables from a .env file
require('dotenv').config();

// Initializing the express application and setting the port number
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
// Middleware to parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Creating a connection to the MySQL database
const db = mysql.createConnection (
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "employees_db"
    },
    console.log("**RUNNING EMPLOYEE TRACKER**")
);

// Connecting to the database and calling the database() function once the connection has been established
db.connect(function (err) {
    if (err) console.log(err); // If an error occurs during the connection, log the error message to the console
    database(); // Once the connection has been established, call the database() function
});

// An array of options to display to the user
const userOptions = [
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Finished!",
                ]
        }
];

// A function to prompt the user for input and execute the appropriate function based on their selection
const database = function() {
    // Prompt the user with the options in userOptions
    inquirer
        .prompt(userOptions) // Destructure the response object to get the selected option
        .then(function({options}){ // Switch statement to execute the appropriate function based on the selected option
            switch (options) {
                case "View All Employees":
                    viewAll();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Departments":
                    viewAllDept();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Finished!":
                    console.log("Thanks for using Employee Manager!")
                    process.exit(); // If the user selects "Finished!", display a message and exit the program
                default:
                    break;
            }
        })
};

// A function to view all employees in the database
const viewAll = function() {
    console.log("Here are all of the current employees:" )
    // Select all columns from the employee table
    const employees = `SELECT * FROM employee`;
    // Execute the SQL query using the db.query method
    db.query(employees, function (err, res){
        if(err) throw err;
        console.table(res); // Display the results in a formatted table using console.table
        database(); // Return to the main menu after displaying the results
    });
};

// A function to view all roles in the database
const viewAllRoles = function() {
    console.log("Here are all of the current roles:" )
    // Select all columns from the role table
    const roles = `SELECT * FROM role`;
    // Execute the SQL query using the db.query method
    db.query(roles, function (err, res){
        if(err) throw err;
        console.table(res); // Display the results in a formatted table using console.table
        database(); // Return to the main menu after displaying the results
    });
};

// A function to view all departments in the database
const viewAllDept = function() {
    console.log("Here are all of the current departments:" )
    // Select all columns from the department table
    const departments = `SELECT * FROM department`;
    // Execute the SQL query using the db.query method
    db.query(departments, function (err, res){
        if(err) throw err;
        console.table(res); // Display the results in a formatted table using console.table
        database(); // Return to the main menu after displaying the results
    });
};

// This function retrieves all the roles from the database and maps them into an array of objects
// containing the role ID, title, and salary. Then, it calls the roleOptions function with the role array.
const addEmployee = function() {
    let employee = `SELECT role.id, role.title, role.salary FROM role`;
    
    db.query(employee, (err, res) => {
      if (err) throw err;
      // Map the roles into an array of objects containing the ID, title, and salary of each role
      const role = res.map(({ id, title, salary }) => ({ value: id, title, salary }));
      
      // Log the roles in a table and call the roleOptions function with the role array
      console.table(res);
      roleOptions(role);
    });
};
  
const roleOptions = function(role) {
    // Prompt the user for the employee's first name, last name, and role ID
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role ID?",
                choices: role
            }
        ]).then((newEmployee)=>{
            // Insert the new employee into the database with the given information
            let employee = `INSERT INTO employee SET ?`
            db.query(employee,{
                first_name: newEmployee.firstName,
                last_name: newEmployee.lastName,
                role_id: newEmployee.roleId
            },(err)=>{
                if(err) throw err;
                console.log("New employee added!")
                database();
            });
        });
};

// Function to update employee role
const updateRole = function() {
    // Select all employee records and get their id, first name and last name
  let updateRole = `SELECT employee.employee_id, employee.first_name, employee.last_name FROM employee`

  // Execute the SQL query
  db.query(updateRole, (err, res) => {
    if (err) throw err;
    // Map the result set to an array of objects with value and name properties
    const employee = res.map(({ employee_id, first_name, last_name }) => 
    ({ value: employee_id, name: `${first_name} ${last_name}` }));
    console.table(res);
    // Call the function to prompt user to select an employee to update their role
    updateEmpRole(employee);
  });
};

// This function queries the database to get a list of roles to display as options for updating an employee's role
function updateEmpRole(employee) {
    let role = `SELECT role.id, role.title, role.salary FROM role`;
    db.query(role, (err, res) => {
      if (err) throw err;
      // Format the query response into an array of role choices to display to the user, containing the role ID, title, and salary
      let roleChoices = res.map(({ id, title, salary }) => ({ 
        value: id, 
        title: `${title}`,
        salary: `${salary}`
        }));
      console.table(res);
      // Call the getUpdatedRole function to prompt the user to select the new role for the employee
      getUpdatedRole(employee, roleChoices);
    });
  };

  // This function prompts the user to select an employee and a new role for the employee.
const getUpdatedRole = function(employee, roleChoices) {
    inquirer
        .prompt([
        {
            type: "list",
            name: "employee",
            message: `Employee who's role will be Updated: `,
            choices: employee
        },
        {
            type: "list",
            name: "role",
            message: "Select New Role: ",
            choices: roleChoices
        },

        ]).then((res)=>{
            // Once the user has selected an employee and a new role, update the employee's role in the database.
            let updatedEmployee = `UPDATE employee SET role_id = ? WHERE employee_id = ?`
            db.query(updatedEmployee,[ res.role, res.employee],(err, res)=>{
                if(err)throw err;
                database();
            });
        });
};

const addRole = function() {
    // SQL query to select all departments from the database
    let department = `SELECT department.id, department.name FROM department`;
    
    db.query(department, (err, res) => {
      if (err) throw err;
      // Maps the department query results to an array of objects containing id and name properties
      const department = res.map(({ id, name }) => ({
        value: id,
        name: `${name}`
        }));
      
      console.table(res);
      // Calls the newRoleOptions function with the department array as an argument
      newRoleOptions(department);
    });
};

// This function takes a department array as a parameter, which will be used as choices for the department list
const newRoleOptions = function(department) {
    // Prompt the user for information
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the role's title?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the role's salary?"
            },
            {
                type: "list",
                name: "departmentId",
                message: "Which department does this role belong to?",
                choices: department
            }
        ]).then((newRoleOptions)=>{
            // When the user has provided all necessary information, the data will be inserted into the role table in the database
            let role = `INSERT INTO role SET ?`
            db.query(role,{
                title: newRoleOptions.roleName,
                salary: newRoleOptions.roleSalary,
                department_id: newRoleOptions.departmentId
            },(err) => {
                if(err) throw err;
                // After the data has been inserted, call the database function to update the table data
                database();
            });
        });
};

// This function prompts the user to provide a name for a new department
const addDepartment = function(department) {
    // Prompt the user for information
    inquirer
        .prompt([
            {
                type: "input",
                name: "departmentName",
                message: "What is the name of the new department?"
            }
        ]).then((addDepartment)=>{
            // When the user has provided the necessary information, the data will be inserted into the department table in the database
            let department = `INSERT INTO department SET?`
            db.query(department,{
                name: addDepartment.departmentName,
            },(err)=>{
                if(err) throw err;
                // After the data has been inserted, call the database function to update the table data
                database()
            });
        });
};