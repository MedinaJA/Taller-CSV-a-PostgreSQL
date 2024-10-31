
const express = require('express');
const multer = require('multer');
const { importDepartments } = require('../controllers/importCSV');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Definir las rutas
router.post('/import', upload.single('file'), importDepartments);

module.exports = router;
