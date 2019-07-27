const mongoose = require('mongoose');
const uniqValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
let empleadoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario.'] },
    apellido: {type: String, required:[true,'Los apellidos son necesarios.'] },
    puesto: { type: String, required: true },
    diaInicio: { type: Number, required: true },
    mesInicio: { type: Number, required: true },
    anoInicio: { type: Number, required: true },
    activo: { type: Boolean, required: true, default: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    img: { type: String, required: false }
});

module.exports = mongoose.model('Empleado', empleadoSchema);