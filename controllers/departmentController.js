const fs = require('fs');
const fastcsv = require('fast-csv');
const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: '010203',
    database: 'HumanResources',
    port: '5432'
});

// Función para exportar departamentos a CSV
const exportDepartmentsToCSV = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM departments'); 
        const jsonData = result.rows; // Obtiene los datos en formato JSON
        console.log("Datos leídos:", jsonData);

        const ws = fs.createWriteStream('departments.csv');
        fastcsv.write(jsonData, { headers: true })
            .on("finish", function () {
                console.log("Write to departments.csv successfully!");
                res.send('CSV exportado exitosamente'); // Enviar respuesta al cliente
            })
            .pipe(ws);
    } catch (error) {
        console.error('Error al exportar a CSV:', error);
        res.status(500).send('Error al exportar datos');
    }
};

module.exports = {
    exportDepartmentsToCSV,
};
