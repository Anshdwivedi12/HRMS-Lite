const attendanceModel = require('../models/attendanceModel');
const employeeModel = require('../models/employeeModel');

// Validation helper
const validateAttendance = (data) => {
    const { employee_id, date, status } = data;

    if (!employee_id || !date || !status) {
        throw new Error('All fields are required: employee_id, date, status');
    }

    if (status !== 'Present' && status !== 'Absent') {
        throw new Error('Status must be either "Present" or "Absent"');
    }

    // Date validation (YYYY-MM-DD format)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        throw new Error('Date must be in YYYY-MM-DD format');
    }
};

// Mark attendance
const markAttendance = async (req, res, next) => {
    try {
        // Validate input
        validateAttendance(req.body);

        const { employee_id } = req.body;

        // Check if employee exists
        const employee = await employeeModel.getEmployeeById(employee_id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        const attendance = await attendanceModel.markAttendance(req.body);

        res.status(201).json({
            success: true,
            message: 'Attendance marked successfully',
            data: attendance
        });
    } catch (error) {
        if (error.message.includes('required') || error.message.includes('must be')) {
            error.name = 'ValidationError';
        }
        next(error);
    }
};

// Get attendance for specific employee
const getAttendanceByEmployee = async (req, res, next) => {
    try {
        const { employeeId } = req.params;

        // Check if employee exists
        const employee = await employeeModel.getEmployeeById(employeeId);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        const attendance = await attendanceModel.getAttendanceByEmployee(employeeId);

        res.status(200).json({
            success: true,
            message: 'Attendance records retrieved successfully',
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};

// Get attendance for specific date
const getAttendanceByDate = async (req, res, next) => {
    try {
        const { date } = req.params;

        // Validate date format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({
                success: false,
                message: 'Date must be in YYYY-MM-DD format'
            });
        }

        const attendance = await attendanceModel.getAttendanceByDate(date);

        res.status(200).json({
            success: true,
            message: 'Attendance records retrieved successfully',
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};

// Get attendance summary (today by default or specified date)
const getAttendanceSummary = async (req, res, next) => {
    try {
        // Use query parameter or today's date
        const date = req.query.date || new Date().toISOString().split('T')[0];

        const summary = await attendanceModel.getAttendanceSummary(date);
        const totalEmployees = await employeeModel.getEmployeeCount();

        res.status(200).json({
            success: true,
            message: 'Attendance summary retrieved successfully',
            data: {
                date,
                totalEmployees,
                present: summary.present,
                absent: summary.absent,
                notMarked: totalEmployees - (summary.present + summary.absent)
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    markAttendance,
    getAttendanceByEmployee,
    getAttendanceByDate,
    getAttendanceSummary
};
