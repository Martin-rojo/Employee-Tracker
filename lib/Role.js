const db = require('../config/connection');

class Role {
  // Get all roles with department names
  static async getAllRoles() {
    try {
      // Add logging to debug the issue
      console.log('Attempting to get all roles...');
      
      const result = await db.query(`
        SELECT r.id, r.title, r.salary, r.department_id, d.name AS department_name
        FROM role r
        LEFT JOIN department d ON r.department_id = d.id
        ORDER BY r.id
      `);
      
      console.log('Query executed successfully');
      return result.rows;
    } catch (err) {
      console.error('Error getting roles:', err);
      console.error('Error details:', err.message);
      return [];
    }
  }
  // Add a new role
  static async addRole(title, salary, departmentId) {
    try {
      const result = await db.query(`
        INSERT INTO role (title, salary, department_id)
        VALUES ($1, $2, $3)
        RETURNING id, title, salary, department_id
      `, [title, salary, departmentId]);
      return result.rows[0];
    } catch (err) {
      console.error('Error adding role:', err);
      throw err;
    }
  }

  // Get role by ID
  static async getRoleById(id) {
    try {
      const result = await db.query(`
        SELECT r.id, r.title, r.salary, r.department_id, d.name AS department_name
        FROM role r
        JOIN department d ON r.department_id = d.id
        WHERE r.id = $1
      `, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error getting role by ID:', err);
      throw err;
    }
  }

  // Delete role
  static async deleteRole(id) {
    try {
      const result = await db.query(`
        DELETE FROM role
        WHERE id = $1
        RETURNING id, title
      `, [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error deleting role:', err);
      throw err;
    }
  }
}

module.exports = Role;