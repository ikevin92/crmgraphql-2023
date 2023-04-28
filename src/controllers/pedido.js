import { GraphQLError } from 'graphql';
import Pedido from '../models/Pedido.js';
import Cliente from '../models/Cliente.js';
import Producto from '../models/Producto.js';

const nuevoPedido = async (_, { input }, ctx) => {
  try {
    const { cliente, pedido } = input;

    // Verificar si el cliente existe
    let clienteExiste = await Cliente.findById(cliente);

    if (!clienteExiste) throw new GraphQLError('Cliente no encontrado');

    // Verificar si el cliente es del vendedor
    if (clienteExiste.vendedor.toString() !== ctx.usuario.id) {
      throw new GraphQLError('No tienes las credenciales');
    }

    // Revisar que el stock este disponible
    for await (const articulo of pedido) {
      const { id } = articulo;

      const producto = await Producto.findById(id);

      if (articulo.cantidad > producto.existencia) {
        throw new GraphQLError(
          `El articulo ${producto.nombre} excede la cantidad disponible`,
        );
      }
    }

    const nuevoPedido = new Pedido(input);

    nuevoPedido.vendedor = ctx.usuario.id;

    const pedidoGuardado = await nuevoPedido.save();

    // Retornar el pedido
    return pedidoGuardado;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo crear el pedido. Error en la base de datos: ' + error.message,
    );
  }
};

export { nuevoPedido };
