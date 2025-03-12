const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

// Main menu prompt
const mainMenuPrompt = {
  type: 'list',
  name: 'action',
  message: 'What would you like to do?',
  choices: [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee Role',
    // Bonus features
    'Update an Employee Manager',
    'View Employees by Manager',
    'View Employees by Department',
    'Delete a Department',
    'Delete a Role',
    'Delete an Employee',
    'View Department Budget',
    'Exit'
  ]
};

// Add department prompt
const addDepartmentPrompt = {
  type: 'input',
  name: 'name',
  message: 'What is the name of the department?',
  validate: (input) => input ? true : 'Please enter a department name!'
};

// Functions to get dynamic data for prompts
const getRoleChoices = async () => {
  const roles = await Role.getAllRoles();
  return roles.map(role => ({
    name: role.title,
    value: role.id
  }));
};

const getDepartmentChoices = async () => {
  const departments = await Department.getAllDepartments();
  return departments.map(dept => ({
    name: dept.name,
    value: dept.id
  }));
};

const getEmployeeChoices = async () => {
  const employees = await Employee.getAllEmployees();
  return employees.map(emp => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id
  }));
};

const getManagerChoices = async () => {
  const employees = await Employee.getAllEmployees();
  const choices = employees.map(emp => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id
  }));
  
  // Add "None" option for no manager
  choices.unshift({ name: 'None', value: null });
  return choices;
};

// Add role prompts
const addRolePrompts = async () => [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the role?',
    validate: (input) => input ? true : 'Please enter a role title!'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'What is the salary for this role?',
    validate: (input) => {
      const parsed = parseFloat(input);
      return !isNaN(parsed) && parsed > 0 ? true : 'Please enter a valid salary!';
    }
  },
  {
    type: 'list',
    name: 'departmentId',
    message: 'Which department does this role belong to?',
    choices: await getDepartmentChoices()
  }
];

// Add employee prompts
const addEmployeePrompts = async () => [
  {
    type: 'input',
    name: 'firstName',
    message: "What is the employee's first name?",
    validate: (input) => input ? true : 'Please enter a first name!'
  },
  {
    type: 'input',
    name: 'lastName',
    message: "What is the employee's last name?",
    validate: (input) => input ? true : 'Please enter a last name!'
  },
  {
    type: 'list',
    name: 'roleId',
    message: "What is the employee's role?",
    choices: await getRoleChoices()
  },
  {
    type: 'list',
    name: 'managerId',
    message: "Who is the employee's manager?",
    choices: await getManagerChoices()
  }
];

// Update employee role prompts
const updateEmployeeRolePrompts = async () => [
  {
    type: 'list',
    name: 'employeeId',
    message: 'Which employee would you like to update?',
    choices: await getEmployeeChoices()
  },
  {
    type: 'list',
    name: 'roleId',
    message: 'What is their new role?',
    choices: await getRoleChoices()
  }
];

// Update employee manager prompts
const updateEmployeeManagerPrompts = async () => [
  {
    type: 'list',
    name: 'employeeId',
    message: 'Which employee would you like to update?',
    choices: await getEmployeeChoices()
  },
  {
    type: 'list',
    name: 'managerId',
    message: 'Who is their new manager?',
    choices: await getManagerChoices()
  }
];

// View employees by manager prompt
const viewEmployeesByManagerPrompt = async () => ({
  type: 'list',
  name: 'managerId',
  message: 'Which manager do you want to see employees for?',
  choices: await getEmployeeChoices()
});

// View employees by department prompt
const viewEmployeesByDepartmentPrompt = async () => ({
  type: 'list',
  name: 'departmentId',
  message: 'Which department do you want to see employees for?',
  choices: await getDepartmentChoices()
});

// Delete department prompt
const deleteDepartmentPrompt = async () => ({
  type: 'list',
  name: 'departmentId',
  message: 'Which department would you like to delete?',
  choices: await getDepartmentChoices()
});

// Delete role prompt
const deleteRolePrompt = async () => ({
  type: 'list',
  name: 'roleId',
  message: 'Which role would you like to delete?',
  choices: await getRoleChoices()
});

// Delete employee prompt
const deleteEmployeePrompt = async () => ({
  type: 'list',
  name: 'employeeId',
  message: 'Which employee would you like to delete?',
  choices: await getEmployeeChoices()
});

// View department budget prompt
const viewDepartmentBudgetPrompt = async () => ({
  type: 'list',
  name: 'departmentId',
  message: 'Which department budget would you like to view?',
  choices: await getDepartmentChoices()
});

module.exports = {
  mainMenuPrompt,
  addDepartmentPrompt,
  addRolePrompts,
  addEmployeePrompts,
  updateEmployeeRolePrompts,
  updateEmployeeManagerPrompts,
  viewEmployeesByManagerPrompt,
  viewEmployeesByDepartmentPrompt,
  deleteDepartmentPrompt,
  deleteRolePrompt,
  deleteEmployeePrompt,
  viewDepartmentBudgetPrompt
};