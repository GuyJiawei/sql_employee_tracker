const mysql = require("mysql2");
const inquirer = require('inquirer');
const express = require('express');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection (
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "employees_db"
    },
    console.log("**RUNNING EMPLOYEE TRACKER**")
);

db.connect(function (err) {
    if (err) console.log(err);
    database();
});

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

const database = function() {
    inquirer
        .prompt(userOptions)
        .then(function({options}){
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
                    process.exit();
                default:
                    break;
            }
        })
};

const viewAll = function() {
    console.log("Here are all of the current employees:" )

    const employees = `SELECT * FROM employee`;
    db.query(employees, function (err, res){
        if(err) throw err;
        console.table(res);
        database();
    });
};

const viewAllRoles = function() {
    console.log("Here are all of the current roles:" )

    const roles = `SELECT * FROM role`;
    db.query(roles, function (err, res){
        if(err) throw err;
        console.table(res);
        database();
    });
};

const viewAllDept = function() {
    console.log("Here are all of the current departments:" )

    const departments = `SELECT * FROM department`;
    db.query(departments, function (err, res){
        if(err) throw err;
        console.table(res);
        database();
    });
};

const addEmployee = function() {
    let employee = `SELECT role.id, role.title, role.salary FROM role`;
    
    db.query(employee, (err, res) => {
      if (err) throw err;
      const role = res.map(({ id, title, salary }) => ({ value: id, title, salary }));
      
      console.table(res);
      roleOptions(role);
    });
};
  
const roleOptions = function(role) {
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

const updateRole = function() {
  let updateRole = `SELECT employee.employee_id, employee.first_name, employee.last_name FROM employee`

  db.query(updateRole, (err, res) => {
    if (err) throw err;
    const employee = res.map(({ employee_id, first_name, last_name }) => 
    ({ value: employee_id, name: `${first_name} ${last_name}` }));
    console.table(res);
    updateEmpRole(employee);
  });
};

function updateEmpRole(employee) {
    let role = `SELECT role.id, role.title, role.salary FROM role`;
    db.query(role, (err, res) => {
      if (err) throw err;
      let roleChoices = res.map(({ id, title, salary }) => ({ 
        value: id, 
        title: `${title}`,
        salary: `${salary}`
        }));
      console.table(res);
      getUpdatedRole(employee, roleChoices);
    });
  };

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
            let updatedEmployee = `UPDATE employee SET role_id = ? WHERE employee_id = ?`
            db.query(updatedEmployee,[ res.role, res.employee],(err, res)=>{
                if(err)throw err;
                database();
            });
        });
};

const addRole = function() {
    let department = `SELECT department.id, department.name FROM department`;
    
    db.query(department, (err, res) => {
      if (err) throw err;
      const department = res.map(({ id, name }) => ({
        value: id,
        name: `${name}`
        }));
      
      console.table(res);
      newRoleOptions(department);
    });
};

const newRoleOptions = function(department) {
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
            let role = `INSERT INTO role SET ?`
            db.query(role,{
                title: newRoleOptions.roleName,
                salary: newRoleOptions.roleSalary,
                department_id: newRoleOptions.departmentId
            },(err) => {
                if(err) throw err;
                database();
            });
        });
};

const addDepartment = function(department) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "departmentName",
                message: "What is the name of the new department?"
            }
        ]).then((addDepartment)=>{
            let department = `INSERT INTO department SET?`
            db.query(department,{
                name: addDepartment.departmentName,
            },(err)=>{
                if(err) throw err;
                database()
            });
        });
};