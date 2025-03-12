const db = require('../config/connection');

class Department {
  // Get all departments
  static async getAllDepartments() {
    try {
      const result = await db.query(`
        SELECT id, name 
        FROM department
        ORDER BY id
      `);
      return result.rows;
    } catch (err) {
      console.error('Error getting departments:', err);
      throw err;
    }
  }

  // Add a new department
  static async addDepartment(name) {
    try {
      const result = await db.query(`
        INSERT INTO department (name)
        VALUES ($1)
        RETURNING id, name
      `, [name]);
      return result.rows[0];
    } catch (err) {
      console.error('Error adding department:', err);
      throw err;
    }
  }

  // Get department by ID
  static async getDepartmentById(id) {
    try {
      const result = await db.query(`
        SELECT id, name
        FROM department
        WHERE id = $1
      `, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error getting department by ID:', err);
      throw err;
    }
  }

  // Delete department
  static async deleteDepartment(id) {
    try {
      const result = await db.query(`
        DELETE FROM department
        WHERE id = $1
        RETURNING id, name
      `, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error deleting department:', err);
      throw err;
    }
  }

  // Get total utilized budget by department
  static async getDepartmentBudget(departmentId) {
    try {
      const result = await db.query(`
        SELECT d.id, d.name, SUM(r.salary) AS utilized_budget
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE d.id = $1
        GROUP BY d.id, d.name
      `, [departmentId]);
      return result.rows[0];
    } catch (err) {
      console.error('Error getting department budget:', err);
      throw err;
    }
  }
}

module.exports = Department;