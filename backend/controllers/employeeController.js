const employeeModel = require('../models/employeeModel');

// Validation helper
const validateEmployee = (data) => {
    const { employee_id, full_name, email, department } = data;

    if (!employee_id || !full_name || !email || !department) {
        throw new Error('All fields are required: employee_id, full_name, email, department');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    // Employee ID validation (alphanumeric, no spaces)
    const idRegex = /^[a-zA-Z0-9]+$/;
    if (!idRegex.test(employee_id)) {
        throw new Error('Employee ID must be alphanumeric with no spaces');
    }
};

// Get all employees
const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await employeeModel.getAllEmployees();
        res.status(200).json({
            success: true,
            message: 'Employees retrieved successfully',
            data: employees
        });
    } catch (error) {
        next(error);
    }
};

// Get single employee by ID
const getEmployeeById = async (req, res, next) => {
    try {
        const { employeeId } = req.params;
        const employee = await employeeModel.getEmployeeById(employeeId);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Employee retrieved successfully',
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

// Create new employee
const createEmployee = async (req, res, next) => {
    try {
        // Validate input
        validateEmployee(req.body);

        const employee = await employeeModel.createEmployee(req.body);

        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: employee
        });
    } catch (error) {
        if (error.message.includes('required') || error.message.includes('Invalid')) {
            error.name = 'ValidationError';
        }
        next(error);
    }
};

// Delete employee
const deleteEmployee = async (req, res, next) => {
    try {
        const { employeeId } = req.params;
        const employee = await employeeModel.deleteEmployee(employeeId);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Employee and associated attendance records deleted successfully',
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    deleteEmployee
};
