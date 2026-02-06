const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Attendance routes
router.post('/', attendanceController.markAttendance);
router.get('/summary', attendanceController.getAttendanceSummary);
router.get('/:employeeId', attendanceController.getAttendanceByEmployee);
router.get('/date/:date', attendanceController.getAttendanceByDate);

module.exports = router;
