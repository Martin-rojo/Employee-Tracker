const inquirer = require('inquirer');
const cTable = require('console.table');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');
const prompts = require('./lib/prompts');

// Display the ASCII art title
const displayTitle = () => {
  console.log(`
┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  ______                 _                                        │
  │ |  ____|               | |                                       │
  │ | |__   _ __ ___  _ __ | | ___  _   _  ___  ___                  │
  │ |  __| | '_ \` _ \\| '_ \\| |/ _ \\|   | |/ _ \\/ _ \\           │
  │ | |____| | | | | | |_) | | (_) | |_| |  __/ __/                  │
  │ |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|  \\___|           │
  │                  | |             __/ |                           │
  │                  |_|            |___/                            │
  │                                                                  │
  │  __  __                                                          │
  │ |  \\/  |                                                        │
  │ | \\  / | __ _ _ __   __ _  __ _  ___ _ __                       │
  │ | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |/ _ \\ '__|                 │
  │ | |  | | (_| | | | |  (_| |(_| |  __/ |                          │
  │ |_|  |_|\\__,_| _| |_|\\__,_|\\__, |\\___|_|                     │
  │                            __/ |                                 │
  │                           |___/                                  │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘
  `);
};

// Initialize the application
async function init() {
  displayTitle();
  await mainMenu();
}

// Main menu
async function mainMenu() {
  try {
    const { action } = await inquirer.prompt(prompts.mainMenuPrompt);

    switch (action) {
      case 'View All Departments':
        await viewAllDepartments();
        break;
      case 'View All Roles':
        await viewAllRoles();
        break;
      case 'View All Employees':
        await viewAllEmployees();
        break;
      case 'Add a Department':
        await addDepartment();
        break;
      case 'Add a Role':
        await addRole();
        break;
      case 'Add an Employee':
        await addEmployee();
        break;
      case 'Update an Employee Role':
        await updateEmployeeRole();
        break;
      case 'Update an Employee Manager':
        await updateEmployeeManager();
        break;
      case 'View Employees by Manager':
        await viewEmployeesByManager();
        break;
      case 'View Employees by Department':
        await viewEmployeesByDepartment();
        break;
      case 'Delete a Department':
        await deleteDepartment();
        break;
      case 'Delete a Role':
        await deleteRole();
        break;
      case 'Delete an Employee':
        await deleteEmployee();
        break;
      case 'View Department Budget':
        await viewDepartmentBudget();
        break;
      case 'Exit':
        console.log('Thank you for using the Employee Tracker!');
        process.exit(0);
      default:
        console.log('Invalid option. Please try again.');
        await mainMenu();
    }
  } catch (err) {
    console.error('Error in main menu:', err);
    await mainMenu();
  }
}

// View all departments
async function viewAllDepartments() {
  try {
    const departments = await Department.getAllDepartments();
    console.log('\n');
    console.table(departments);
  } catch (err) {
    console.error('Error viewing departments:', err);
  }
  await mainMenu();
}

// View all roles
async function viewAllRoles() {
  try {
    const roles = await Role.getAllRoles();
    console.log('\n');
    console.table(roles);
  } catch (err) {
    console.error('Error viewing roles:', err);
  }
  await mainMenu();
}

// View all employees
async function viewAllEmployees() {
  try {
    const employees = await Employee.getAllEmployees();
    console.log('\n');
    console.table(employees);
  } catch (err) {
    console.error('Error viewing employees:', err);
  }
  await mainMenu();
}

// Add a department
async function addDepartment() {
  try {
    const answers = await inquirer.prompt(prompts.addDepartmentPrompt);
    const result = await Department.addDepartment(answers.name);
    console.log(`\nAdded department ${result.name} with ID ${result.id}\n`);
  } catch (err) {
    console.error('Error adding department:', err);
  }
  await mainMenu();
}

// Add a role
async function addRole() {
  try {
    const promptsArray = await prompts.addRolePrompts();
    const answers = await inquirer.prompt(promptsArray);
    const result = await Role.addRole(answers.title, answers.salary, answers.departmentId);
    console.log(`\nAdded role ${result.title} with ID ${result.id}\n`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
  await mainMenu();
}

// Add an employee
async function addEmployee() {
  try {
    const promptsArray = await prompts.addEmployeePrompts();
    const answers = await inquirer.prompt(promptsArray);
    const result = await Employee.addEmployee(
      answers.firstName,
      answers.lastName,
      answers.roleId,
      answers.managerId
    );
    console.log(`\nAdded employee ${result.first_name} ${result.last_name} with ID ${result.id}\n`);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
  await mainMenu();
}

// Update an employee's role
async function updateEmployeeRole() {
  try {
    const promptsArray = await prompts.updateEmployeeRolePrompts();
    const answers = await inquirer.prompt(promptsArray);
    const result = await Employee.updateEmployeeRole(answers.employeeId, answers.roleId);
    console.log(`\nUpdated employee ${result.first_name} ${result.last_name}'s role\n`);
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
  await mainMenu();
}

// Update an employee's manager
async function updateEmployeeManager() {
  try {
    const promptsArray = await prompts.updateEmployeeManagerPrompts();
    const answers = await inquirer.prompt(promptsArray);
    const result = await Employee.updateEmployeeManager(answers.employeeId, answers.managerId);
    console.log(`\nUpdated employee ${result.first_name} ${result.last_name}'s manager\n`);
  } catch (err) {
    console.error('Error updating employee manager:', err);
  }
  await mainMenu();
}

// Start the application
init();

// View employees by manager
async function viewEmployeesByManager() {
  try {
    const prompt = await prompts.viewEmployeesByManagerPrompt();
    const { managerId } = await inquirer.prompt(prompt);
    const employees = await Employee.getEmployeesByManager(managerId);
    
    if (employees.length === 0) {
      console.log('\nThis person does not manage any employees.\n');
    } else {
      console.log('\n');
      console.table(employees);
    }
  } catch (err) {
    console.error('Error viewing employees by manager:', err);
  }
  await mainMenu();
}

// View employees by department
async function viewEmployeesByDepartment() {
  try {
    const prompt = await prompts.viewEmployeesByDepartmentPrompt();
    const { departmentId } = await inquirer.prompt(prompt);
    const employees = await Employee.getEmployeesByDepartment(departmentId);
    
    if (employees.length === 0) {
      console.log('\nThere are no employees in this department.\n');
    } else {
      console.log('\n');
      console.table(employees);
    }
  } catch (err) {
    console.error('Error viewing employees by department:', err);
  }
  await mainMenu();
}

// Delete a department
async function deleteDepartment() {
  try {
    const prompt = await prompts.deleteDepartmentPrompt();
    const { departmentId } = await inquirer.prompt(prompt);
    const result = await Department.deleteDepartment(departmentId);
    
    if (result) {
      console.log(`\nDeleted department ${result.name} with ID ${result.id}\n`);
    } else {
      console.log('\nDepartment not found or could not be deleted.\n');
    }
  } catch (err) {
    console.error('Error deleting department:', err);
    console.log('\nCould not delete department. Check if it has associated roles or employees.\n');
  }
  await mainMenu();
}

// Delete a role
async function deleteRole() {
  try {
    const prompt = await prompts.deleteRolePrompt();
    const { roleId } = await inquirer.prompt(prompt);
    const result = await Role.deleteRole(roleId);
    
    if (result) {
      console.log(`\nDeleted role ${result.title} with ID ${result.id}\n`);
    } else {
      console.log('\nRole not found or could not be deleted.\n');
    }
  } catch (err) {
    console.error('Error deleting role:', err);
    console.log('\nCould not delete role. Check if it has associated employees.\n');
  }
  await mainMenu();
}

// Delete an employee
async function deleteEmployee() {
  try {
    const prompt = await prompts.deleteEmployeePrompt();
    const { employeeId } = await inquirer.prompt(prompt);
    const result = await Employee.deleteEmployee(employeeId);
    
    if (result) {
      console.log(`\nDeleted employee ${result.first_name} ${result.last_name} with ID ${result.id}\n`);
    } else {
      console.log('\nEmployee not found or could not be deleted.\n');
    }
  } catch (err) {
    console.error('Error deleting employee:', err);
    console.log('\nCould not delete employee. Check if they are a manager for other employees.\n');
  }
  await mainMenu();
}

// View department budget
async function viewDepartmentBudget() {
  try {
    const prompt = await prompts.viewDepartmentBudgetPrompt();
    const { departmentId } = await inquirer.prompt(prompt);
    const result = await Department.getDepartmentBudget(departmentId);
    
    if (result) {
      console.log(`\nDepartment: ${result.name}`);
      console.log(`Total Utilized Budget: ${result.utilized_budget.toLocaleString()}\n`);
    } else {
      console.log('\nDepartment not found or has no employees.\n');
    }
  } catch (err) {
    console.error('Error viewing department budget:', err);
  }
  await mainMenu();
}