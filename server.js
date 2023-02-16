const mysql = require("mysql2");
const inquirer = require('inquirer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection (
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "employees_db"
    },
    console.log("**RUNNING EMPLOYEE TRACKER**")
);

connection.connect(function (err) {
    if (err) console.log(err);
    options();
});

function options() {
    inquirer
        .prompt({
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Roles",
                "View All Departments",
                "Add Department",
                "Finished!",
            ]
        })
};

const optionFunctions = {
    "View All Employees": viewAll,
    "Add Employee": addEmployee,
    "Update Employee Role": updateRole,
    "View All Roles": viewAllRoles,
    "View All Departments": viewAllDept,
    "Add Role": addRole,
    "Add Department": addDepartment,
    "Quit": () => console.log("Thanks for using Employee Manager!")
  };
  
const database = function() {
inquirer.prompt(choices)
    .then(({ options }) => optionFunctions[options]());
};

const viewAll = async function() {
    console.log("Here are all of the current employees:" )

    const employees = `SELECT * FROM employee`;
    try {
        const res = await db.query(employees);
        console.table(res);
        database();
    } catch (err) {
        console.error(err);
    }
};

const viewAllRoles = async function() {
    console.log("Here are all of the available roles:" )

    const roles = `SELECT * FROM role`;
    try {
        const res = await db.query(roles);
        console.table(res);
        database();
    } catch (err) {
        console.error(err);
    }
};

const viewAllDept = async function() {
    console.log("Here are all of the current departments:" )
    
    const department = `SELECT * FROM department`;
    try {
        const res = await db.query(department);
        console.table(res);
        database();
    } catch (err) {
        console.error(err);
    }
};

const addEmployee = function() {
    let employee = `SELECT roles.id, roles.title, roles.salary FROM roles`;
    
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
                message: "What is the employee's role?",
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
  let query = `SELECT employee.employee_id, employee.first_name, employee.last_name FROM employee`;
  db.query(query, (err, res) => {
    if (err) throw err;
    const employee = res.map(({ employee_id, first_name, last_name }) => 
    ({ value: employee_id, name: `${first_name} ${last_name}` }));
    console.table(res);
    updateEmpRole(employee);
  });
};

function updateEmpRole(employee) {
    let query = `SELECT roles.id, roles.title, roles.salary FROM roles`;
    db.query(query, (err, res) => {
      if (err) throw err;
      let roleChoices = res.map(({ id, title, salary }) => ({ value: id, title, salary }));
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
            db.query(updatedEmployee,[ res.roles, res.employee],(err, res)=>{
                if(err)throw err;
                database();
            });
        });
};

const addRole = function() {
    let department = `SELECT department.id, department.title FROM department`;
    
    db.query(department, (err, res) => {
      if (err) throw err;
      const department = res.map(({ id, title }) => ({ value: id, title }));
      
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
            let role = `INSERT INTO roles SET?`
            db.query(role,{
                title: newRoleOptions.roleName,
                salary: newRoleOptions.roleSalary,
                department: newRoleOptions.departmentId
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
                title: addDepartment.departmentName,
            },(err)=>{
                if(err) throw err;
                database()
            });
        });
};