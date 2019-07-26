//===========================================
//         REQUIRES NECESARIOS PARA 
//          HACER USO DE WEBSERVER
//===========================================
require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const hbs = require('hbs');
//===========================================
//        VARIABLE GLOBAL PARA EL 
//    PUERTO DINAMICO EN HEROKU Y LOCAL
//===========================================
const puerto = process.env.PORT;
//===========================================
//     INICIALIZACION DE BODY PARSER
//===========================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//===========================================
//DAMOS PERMISOS DE ACCESO A CARPETA PUBLIC
//===========================================
app.use(express.static(path.resolve(__dirname, '../public')));
//===========================================
//  INICIALIZAMOS LAS RUTAS PARA PETICIONES              
//===========================================
app.use(require('./routes/index'));
//===========================================
//             CONEXION MONGOOSE
//===========================================
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos activa.')
});
//===========================================
//              ABRIMOS PUERTO 
//===========================================
app.listen(puerto, () => {
    console.log("ESTAMOS EN EL PUERTO: ", puerto);
})