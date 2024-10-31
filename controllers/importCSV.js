
const xlsx = require('xlsx');
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: '010203',
    database: 'HumanResources',
    port: '5432'
});

exports.importDepartments = async (req, res) => {
    try {
        const filePath = req.file.path;

        // Lee el archivo Excel
        const workbook = xlsx.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Recorre los datos y realiza las inserciones o actualizaciones en la BD
        for (const row of data) {
            await pool.query(
                `INSERT INTO departments (department_id, department_name, manager_id, location_id)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (department_id) DO UPDATE SET
                department_name = EXCLUDED.department_name,
                manager_id = EXCLUDED.manager_id,
                location_id = EXCLUDED.location_id`, 
                [row.department_id, row.department_name, row.manager_id, row.location_id]
            );
        }

        // Elimina el archivo temporal
        fs.unlinkSync(filePath);
        res.send('Datos importados correctamente a la base de datos.');
    } catch (error) {
        console.error('Error al importar datos:', error);
        res.status(500).send('Error al importar datos');
    }
};
