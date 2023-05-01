import { Schema, model } from 'mongoose';

const PedidosSchema = new Schema(
  {
    pedido: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    cliente: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Cliente',
    },
    vendedor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    estado: {
      type: String,
      enum: ['PENDIENTE', 'COMPLETADO', 'CANCELADO'],
      default: 'PENDIENTE',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Pedido = model('Pedido', PedidosSchema);

export default Pedido;
