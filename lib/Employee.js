const db = require('../config/connection');

class Employee {
  // Get all employees with role and manager information
  static async getAllEmployees() {
    try {
      const result = await db.query(`
        SELECT 
          e.id, 
          e.first_name, 
          e.last_name, 
          e.role_id, 
          e.manager_id,
          r.title AS job_title, 
          r.salary,
          d.name AS department,
          CONCAT(m.first_name, ' ', m.last_name) AS manager_name
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY e.id
      `);
      return result.rows;
    } catch (err) {
      console.error('Error getting employees:', err);
      throw err;
    }
  }

  // Add a new employee
  static async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      const result = await db.query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first_name, last_name, role_id, manager_id
      `, [firstName, lastName, roleId, managerId || null]);
      return result.rows[0];
    } catch (err) {
      console.error('Error adding employee:', err);
      throw err;
    }
  }

  // Update an employee's role
  static async updateEmployeeRole(employeeId, roleId) {
    try {
      const result = await db.query(`
        UPDATE employee
        SET role_id = $1
        WHERE id = $2
        RETURNING id, first_name, last_name, role_id, manager_id
      `, [roleId, employeeId]);
      return result.rows[0];
    } catch (err) {
      console.error('Error updating employee role:', err);
      throw err;
    }
  }

  // Update an employee's manager
  static async updateEmployeeManager(employeeId, managerId) {
    try {
      const result = await db.query(`
        UPDATE employee
        SET manager_id = $1
        WHERE id = $2
        RETURNING id, first_name, last_name, role_id, manager_id
      `, [managerId || null, employeeId]);
      return result.rows[0];
    } catch (err) {
      console.error('Error updating employee manager:', err);
      throw err;
    }
  }

  // Get employees by manager ID
  static async getEmployeesByManager(managerId) {
    try {
      const result = await db.query(`
        SELECT 
          e.id, 
          e.first_name, 
          e.last_name, 
          r.title AS job_title,
          d.name AS department
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE e.manager_id = $1
        ORDER BY e.last_name, e.first_name
      `, [managerId]);
      return result.rows;
    } catch (err) {
      console.error('Error getting employees by manager:', err);
      throw err;
    }
  }

  // Get employees by department ID
  static async getEmployeesByDepartment(departmentId) {
    try {
      const result = await db.query(`
        SELECT 
          e.id, 
          e.first_name, 
          e.last_name, 
          r.title AS job_title,
          CONCAT(m.first_name, ' ', m.last_name) AS manager_name
        FROM employee e
        JOIN role r ON e.role_id = r.id
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE r.department_id = $1
        ORDER BY e.last_name, e.first_name
      `, [departmentId]);
      return result.rows;
    } catch (err) {
      console.error('Error getting employees by department:', err);
      throw err;
    }
  }

  // Delete an employee
  static async deleteEmployee(id) {
    try {
      const result = await db.query(`
        DELETE FROM employee
        WHERE id = $1
        RETURNING id, first_name, last_name
      `, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error deleting employee:', err);
      throw err;
    }
  }

  // Get all managers (employees who are managers)
  static async getAllManagers() {
    try {
      const result = await db.query(`
        SELECT DISTINCT m.id, m.first_name, m.last_name
        FROM employee e
        JOIN employee m ON e.manager_id = m.id
        ORDER BY m.last_name, m.first_name
      `);
      return result.rows;
    } catch (err) {
      console.error('Error getting managers:', err);
      throw err;
    }
  }
}

module.exports = Employee;