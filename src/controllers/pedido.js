import { GraphQLError } from 'graphql';
import Cliente from '../models/Cliente.js';
import Pedido from '../models/Pedido.js';
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

      // Restar la cantidad a lo disponible
      producto.existencia = producto.existencia - articulo.cantidad;
      await producto.save();
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

const obtenerPedidos = async () => {
  try {
    const pedidos = await Pedido.find({});
    // .populate('cliente')
    // .populate('vendedor');

    return pedidos;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudieron obtener los pedidos. Error en la base de datos: ' +
        error.message,
    );
  }
};

// eslint-disable-next-line no-empty-pattern
const obtenerPedidosVendedor = async (_, {}, ctx) => {
  try {
    const pedidos = await Pedido.find({ vendedor: ctx.usuario.id });
    // .populate('cliente');

    return pedidos;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudieron obtener los pedidos. Error en la base de datos: ' +
        error.message,
    );
  }
};

const obtenerPedido = async (_, { id }, ctx) => {
  try {
    const pedido = await Pedido.findById(id);
    // .populate('cliente')
    // .populate('vendedor');

    if (!pedido) throw new GraphQLError('Pedido no encontrado');

    // Solo quien lo creo puede verlo
    if (pedido.vendedor.toString() !== ctx.usuario.id) {
      throw new GraphQLError('No tienes las credenciales');
    }

    return pedido;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo obtener el pedido. Error en la base de datos: ' +
        error.message,
    );
  }
};

// aactualizarPedido
// eslint-disable-next-line no-empty-pattern
const actualizarPedido = async (_, { id, input }, ctx) => {
  try {
    const { cliente, pedido } = input;

    // Si el pedido existe
    const existePedido = await Pedido.findById(id);
    if (!existePedido) throw new GraphQLError('Pedido no encontrado');

    // Si el cliente existe
    const existeCliente = await Cliente.findById(cliente);
    if (!existeCliente) throw new GraphQLError('Cliente no encontrado');

    // Si el cliente y pedido pertenece al vendedor
    if (existeCliente.vendedor.toString() !== ctx.usuario.id) {
      throw new GraphQLError('No tienes las credenciales');
    }

    // Revisar el stock
    for await (const articulo of pedido) {
      const { id } = articulo;

      const producto = await Producto.findById(id);

      if (articulo.cantidad > producto.existencia) {
        throw new GraphQLError(
          `El articulo ${producto.nombre} excede la cantidad disponible`,
        );
      }

      // Restar la cantidad a lo disponible
      producto.existencia = producto.existencia - articulo.cantidad;
      await producto.save();
    }

    // Guardar el pedido
    const pedidoActualizado = await Pedido.findOneAndUpdate(
      { _id: id },
      input,
      { new: true },
    );

    return pedidoActualizado;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo actualizar el pedido. Error en la base de datos: ' +
        error.message,
    );
  }
};

const eliminarPedido = async (_, { id }, ctx) => {
  try {
    const existePedido = await Pedido.findById(id);
    if (!existePedido) throw new GraphQLError('Pedido no encontrado');

    // Solo quien lo creo puede verlo
    if (existePedido.vendedor.toString() !== ctx.usuario.id)
      throw new GraphQLError('No tienes las credenciales');

    // Eliminar de la base de datos
    await Pedido.findOneAndDelete({ _id: id });

    return 'Pedido eliminado';
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo eliminar el pedido. Error en la base de datos: ' +
        error.message,
    );
  }
};

const obtenerPedidosEstado = (_, { estado }, ctx) => {
  try {
    const pedidos = Pedido.find({ vendedor: ctx.usuario.id, estado });
    return pedidos;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudieron obtener los pedidos. Error en la base de datos: ' +
        error.message,
    );
  }
};

const mutations = {
  nuevoPedido,
  actualizarPedido,
  eliminarPedido,
};

const queries = {
  obtenerPedidos,
  obtenerPedidosVendedor,
  obtenerPedido,
  obtenerPedidosEstado,
};

export { mutations, queries };
