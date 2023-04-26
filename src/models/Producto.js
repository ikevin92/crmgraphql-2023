import { Schema, model } from 'mongoose';

const ProductosSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      trim: true,
    },
    existencia: {
      type: Number,
      required: true,
      trim: true,
    },
    creado: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Producto = model('Producto', ProductosSchema);

export default Producto;
