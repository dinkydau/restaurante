const express = require('express');
const _ = require('underscore');
let app = express();
let Despensa = require('../models/despensa');
//===========================================
//GENERAMOS LA OPERACION GET PARA TRAER EL NUMERO DESEADO DE DESPENSAS, CONSIDERANDO
//COMO DEFAULT EL INICIO EN 0 Y CON UN LIMITE DE 20, SE PUEDE AGREGAR UNO MAS ESPECIFICO
//CON {{URL}}/despensa?desde=<x>&limite=<y> DONDE X ES EL INICIO Y Y LA CANTIDAD DESEADA
//===========================================
app.get('/despensa', (req, res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 20;
    desde = Number(desde);
    limite = Number(limite);
    Despensa.find({ disponible: true }, 'nombre descripcion cantidad disponible categoria img')
        .skip(desde)
        .limit(limite)
        .exec((err, despensa) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: err
                });
            }
            Despensa.countDocuments({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    despensa,
                    limite,
                    desde
                });
            });
        })
})
//===========================================
//Permite el uso del request GET para traer un solo dato de la colección, este solo 
//requiere de indicar cual es el id deseado para seleccionarlo.
//===========================================
app.get('/despensa/:id', (req, res) => {
    let id = req.params.id;
    Despensa.find({ disponible: true }, 'nombre descripcion cantidad disponible categoria img')
        .exec((err, despensa) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: err
                });
            }
            Despensa.countDocuments({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    despensa,
                    limite,
                    desde
                });
            });
        })
})
//===========================================
//Permite hacer el POST de un nuevo dato para agregar dentro de la colección. 
//El unico valor unico es el de nombre y no se requiere llenar masque los valores indicados en el schema
//===========================================
app.post('/despensa', (req, res) => {
    let body = req.body;
    let despensa = new Despensa({
        nombre: body.nombre,
        descripcion: body.descripcion,
        cantidad: body.cantidad,
        disponible: body.disponible,
        categoria: body.categoria,
    })
    despensa.save((err, despensaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }
        res.json({
            ok: true,
            despensa: despensaDB
        });
    })
})
//===========================================
//Permite actualizar los datos del id existenten dentro de la coleccion, mediante el
//uso del ID se pueden editar casi todos los valores que contiene el schema
//===========================================
app.put('/despensa/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion', 'cantidad', 'disponible', 'categoria']);
    Despensa.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, despensaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            usuario: despensaDB
        });
    });
})
//===========================================
//Permite eliminar el valor dentro de la colección, es necesario conocer el valor del ID en
//la coleccion para ELIMINARLO. Por el momento se borra de manera logica y no permanentemente.  
//===========================================
app.delete('/despensa/:id', (req, res) => {
    let id = req.params.id;
    let body = { disponible: false };
    Despensa.findByIdAndUpdate(id,body,{ new: true }, (err, despensaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }
        if (!despensaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Despensa no encontrada'
                }
            });
        }
        res.json({
            ok: true,
            despensa: despensaDB
        })
    })
})
module.exports = app;