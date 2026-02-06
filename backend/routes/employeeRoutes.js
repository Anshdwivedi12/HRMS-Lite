const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee routes
router.get('/', employeeController.getAllEmployees);
router.get('/:employeeId', employeeController.getEmployeeById);
router.post('/', employeeController.createEmployee);
router.delete('/:employeeId', employeeController.deleteEmployee);

module.exports = router;
