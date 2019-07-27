const express = require('express');
const _ = require('underscore');
let app = express();
let Empleado = require('../models/empleado');
//===========================================
//Generamos request basicos para poder hacer peticiones y acciones CRUD sobre la BD empleados
//===========================================
app.get('/empleado', (req, res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 20;
    desde = Number(desde);
    limite = Number(limite);
    Empleado.find({activo:true},'nombre apellido puesto diaInicio mesInicio anoInicio activo img')
        .skip(desde)
        .limit(limite)
        .exec((err, empleadoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: err
                });
            }
            Empleado.countDocuments({activo:true}, (err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    empleadoDB,
                    limite,
                    desde
                });
            });
        })
});
app.get('/empleado/:id', (req, res) => {
    let id = req.params.id;
    Empleado.find
});
app.post('/empleado', (req, res) => {});
app.put('/empleado/:id', (req, res) => {
    let id = req.params.id;
    console.log(`Llego al PUT ${id}`);
});
app.delete('/empleado/:id', (req, res) => {
    let id = req.params.id;
    console.log(`Llego al DELETE ${id}`);
});
module.exports = app;