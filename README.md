# Employee Tracker

  ![License Badge](https://img.shields.io/badge/license-MIT-green.svg)

  ## Description
  Employee Tracker is a CLI applicaiton for building and maintaining companies employee data base. Built on MySQL and leveraging modularity in the structure of Employee Tracker, it can scale appropriatley with a companies growth without reconfiguring the core structure of the internal employee data base. This application can act as a foundation to continue to build upon. Employee allows managers or someone within the company to view all employees, roles, as well as departments. It also allows for adding employees, roles, departments and updating employees all from your CLI.

  ## Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contrubuting)
  * [License](#license)
  * [Questions](#questions)

  ## Installation

  - Clone the repository and run an integrated terminal.
  - Enter 'npm i' to download and install the required dependencies.
  - Create .env file and add: 
  - `DB_NAME='employees_db'`
  - `DB_PASSWORD='INSERT YOUR SQL PASSWORD'`
  - `DB_USER='root'`
  - Open an integrated terminal and enter `mysql -u root -p`, enter password to start MySQL.
  - Enter `source db/schema.sql` to create the database.
  - Enter `source db/seeds.sql` to fill the database.
  - In the terminal enter `node server.js` and the application will run.

  ## Usage

  Program will run in the CLI and allow you to run all of the following functions:
  - "View All Employees"
  - "Add Employee"
  - "Update Employee Role"
  - "View All Roles"
  - "Add Role"
  - "View All Departments"
  - "Add Department"

  ## Contributing

  Contribution to this project will not be accepted, unfortunately. Thank you for your interest!

  
  ## License
  - MIT
  - https://choosealicense.com/licenses/MIT/
  - A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.
  

  ## Questions

  If you have any questions or require further information, please contact me at:

  - GitHub: https://github.com/GuyJiawei
  - Email: guy.jiawei.anderson@gmail.com

  ## Demo

  ![GIF](./Assets/Demo.gif)

  ## Screenshot

  ![Screenshot](./Assets/html_pic.png)
