const express = require('express');
const dotenv = require('dotenv');
const csvDepartment = require('./routes/departmentRoutes')
const csvRoute = require('./routes/csvRoute');

dotenv.config();

const app = express();
const port = 3000;

//Usar las rutas definidas en csvRoutes
app.use('/api', csvDepartment);
app.use('/api', csvRoute);


app.listen(port, () => {
    console.log('Servidor en http://localhost:3000');
});