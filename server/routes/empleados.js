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
    Empleado.find({ activo: true }, 'nombre apellido puesto diaInicio mesInicio anoInicio activo img')
        .skip(desde)
        .limit(limite)
        .exec((err, empleadoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: err
                });
            }
            Empleado.countDocuments({ activo: true }, (err, conteo) => {
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
    Empleado.findById(id, (err, empleadoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }
        res.json({
            ok: true,
            conteo,
            despensa,
            limite,
            desde
        });
    });
});
app.post('/empleado', (req, res) => {
    let body = req.body;
    let empleado = new Empleado({
        nombre: body.nombre,
        apellido: body.apellido,
        puesto: body.puesto,
        diaInicio: body.diaInicio,
        mesInicio: body.mesInicio,
        anoInicio: body.anoInicio,
        usuario: body.usuario,
        img: body.img
    });
        empleado.save((err,empleadoDB)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: err
                });
            }
            res.json({
                ok: true,
                empleadoDB: empleadoDB
            });
        })
});

app.put('/empleado/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','apellido','puesto','diaInicio','mesInicio','anoInicio','usuario','img']);
    Empleado.findByIdAndUpdate(id,body,(err,empleadoDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }
        res.json({
            ok: true,
            empleado: empleadoDB
        });
    })
});
app.delete('/empleado/:id', (req, res) => {
    let id = req.params.id;
    let body = {activo: false };
    Empleado.findByIdAndUpdate(id,body,(err,empleadoDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }
        if (!empleadoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Empleado no encontrada'
                }
            });
        }
        res.json({
            ok: true,
            despensa: despensaDB
        })
    });
});
module.exports = app;