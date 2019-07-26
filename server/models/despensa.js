const mongoose = require('mongoose');
const uniqValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
let despensaSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es necesario'] },
    descripcion: { type: String, required: true },
    cantidad: { type: Number, required: true },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    img: { type: String, required: false }
});

despensaSchema.plugin(uniqValidator, { message: 'ERROR: EL NOMBRE YA FUE ASIGNADO.' })
module.exports = mongoose.model('Despensa', despensaSchema);