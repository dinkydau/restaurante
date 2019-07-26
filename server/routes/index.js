//===========================================
//         PERMITE GENERAR EL BUNDLE 
//       DE TODAS LAS RUTAS NECESARIAS
//===========================================
const express = require('express');
const app = express();
//===========================================
//       AGREGAMOS RUTAS EXISTENTES
//===========================================
// app.use(require('./usuario'));
// app.use(require('./mercancia'));
// app.use(require('./empleados.js'));
// app.use(require('./platillos'));
app.use(require('./despensa'));
module.exports = app;