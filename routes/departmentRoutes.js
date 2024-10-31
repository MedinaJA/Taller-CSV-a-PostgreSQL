const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Ruta para exportar a CSV
router.get('/exportcsv', departmentController.exportDepartmentsToCSV);

module.exports = router;
