# Employee Tracker

  ![License Badge](https://img.shields.io/badge/license-MIT-green.svg)

  ## Description
  Employee Tracker is a command-line interface (CLI) application that enables the creation and management of an employee database for a company. It utilizes MySQL and is designed with modularity in mind, allowing it to scale effectively with the company's growth without requiring significant reconfiguration of the underlying database structure. The application serves as a foundation for continued development, providing features for viewing all employees, roles, and departments, as well as adding and updating employee data all through the command line. This makes it easy for managers and other personnel to maintain and keep track of the company's workforce.

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
