# Employee Tracker

## Description

Employee Tracker is a command-line application built with Node.js, Inquirer, and PostgreSQL that manages a company's employee database. This Content Management System (CMS) allows business owners to view and manage departments, roles, and employees in their company, helping them to organize and plan their business more effectively.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Database Schema](#database-schema)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up this application on your local machine:

1. Clone the repository
    ```bash
    git clone <repository-url>
    cd Employee-Tracker
    ```

2. Install the required dependencies
    ```bash
    npm install
    ```

3. Create a PostgreSQL database
    ```bash
    psql -U postgres -c "CREATE DATABASE employee_tracker;"
    ```

4. Set up environment variables by creating a `.env` file in the root directory
    ```
    DB_USER=postgres
    DB_PASSWORD=your_postgres_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=employee_tracker
    ```

5. Initialize the database with schema and seed data
    ```bash
    psql -U postgres -d employee_tracker -f db/schema.sql
    psql -U postgres -d employee_tracker -f db/seeds.sql
    ```

## Usage

1. Start the application
    ```bash
    npm start
    ```
    or
    ```bash
    node index.js
    ```

2. Use the interactive menu to:
   - View all departments, roles, or employees
   - Add a department, role, or employee
   - Update an employee's role
   - Update an employee's manager
   - View employees by manager
   - View employees by department
   - Delete departments, roles, or employees
   - View the total utilized budget of a department

## Features

### Core Features

- View all departments (with IDs and names)
- View all roles (with titles, salaries, and departments)
- View all employees (with IDs, names, roles, salaries, and managers)
- Add new departments
- Add new roles with title, salary, and department
- Add new employees with name, role, and manager
- Update an employee's role

### Bonus Features

- Update employee managers
- View employees by manager
- View employees by department
- Delete departments, roles, and employees
- View the total utilized budget of a department (sum of all employee salaries)

## Demo


## Database Schema

The application uses the following database schema:

### Department
- `id`: SERIAL PRIMARY KEY
- `name`: VARCHAR(30) UNIQUE NOT NULL

### Role
- `id`: SERIAL PRIMARY KEY
- `title`: VARCHAR(30) UNIQUE NOT NULL
- `salary`: DECIMAL NOT NULL
- `department_id`: INTEGER NOT NULL (Foreign Key to Department)

### Employee
- `id`: SERIAL PRIMARY KEY
- `first_name`: VARCHAR(30) NOT NULL
- `last_name`: VARCHAR(30) NOT NULL
- `role_id`: INTEGER NOT NULL (Foreign Key to Role)
- `manager_id`: INTEGER (Self-referencing Foreign Key to Employee)

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **Inquirer** - Interactive command line user interface
- **PostgreSQL** - Relational database management system
- **pg** - Node.js PostgreSQL client
- **console.table** - Formats terminal output as tables
- **dotenv** - Environmental variable management
## License

This project is licensed under the MIT License - see the LICENSE file for details.

##Questions and Concerns
contact: Martin.rojo101@gmail.com

Github: https://github.com/Martin-rojo
