const mongoose = require('mongoose');

const ClientesSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    empresa: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Cliente', ClientesSchema);
