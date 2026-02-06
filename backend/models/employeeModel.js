const db = require('../config/database');

// Get all employees
const getAllEmployees = async () => {
    const query = 'SELECT * FROM employees ORDER BY created_at DESC';
    const result = await db.query(query);
    return result.rows;
};

// Get employee by employee_id
const getEmployeeById = async (employeeId) => {
    const query = 'SELECT * FROM employees WHERE employee_id = $1';
    const result = await db.query(query, [employeeId]);
    return result.rows[0];
};

// Create new employee
const createEmployee = async (employeeData) => {
    const { employee_id, full_name, email, department } = employeeData;

    const query = `
    INSERT INTO employees (employee_id, full_name, email, department)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

    const result = await db.query(query, [employee_id, full_name, email, department]);
    return result.rows[0];
};

// Delete employee (cascade will delete attendance records)
const deleteEmployee = async (employeeId) => {
    const query = 'DELETE FROM employees WHERE employee_id = $1 RETURNING *';
    const result = await db.query(query, [employeeId]);
    return result.rows[0];
};

// Get employee count
const getEmployeeCount = async () => {
    const query = 'SELECT COUNT(*) as count FROM employees';
    const result = await db.query(query);
    return parseInt(result.rows[0].count);
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    deleteEmployee,
    getEmployeeCount
};
