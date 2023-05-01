import { GraphQLError } from 'graphql';
import Cliente from '../models/Cliente.js';

const nuevoCliente = async (_, { input }, ctx) => {
  try {
    const { email } = input;
    const cliente = await Cliente.findOne({ email });

    if (cliente) throw new GraphQLError('El cliente ya existe');

    const nuevoCliente = new Cliente(input);
    nuevoCliente.vendedor = ctx.usuario.id;
    const resultado = await nuevoCliente.save();

    return resultado;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo crear el cliente. Error en la base de datos: ' +
        error.message,
    );
  }
};

const obtenerClientes = async () => {
  try {
    const clientes = await Cliente.find({});
    return clientes;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo obtener los clientes. Error en la base de datos: ' +
        error.message,
    );
  }
};

// eslint-disable-next-line no-empty-pattern
const obtenerClientesVendedor = async (_, {}, ctx) => {
  try {
    const vendedor = ctx.usuario.id.toString();
    const clientes = await Cliente.find({ vendedor });
    return clientes;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo obtener los clientes. Error en la base de datos: ' +
        error.message,
    );
  }
};

const obtenerCliente = async (_, { id }, ctx) => {
  try {
    const cliente = await Cliente.findById(id);
    if (!cliente) throw new GraphQLError('Cliente no encontrado');

    const vendedor = ctx.usuario.id.toString();
    if (cliente.vendedor.toString() !== vendedor) {
      throw new GraphQLError('No tienes las credenciales');
    }

    return cliente;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo obtener el cliente. Error en la base de datos: ' +
        error.message,
    );
  }
};

const actualizarCliente = async (_, { id, input }, ctx) => {
  try {
    let cliente = await Cliente.findById(id);
    if (!cliente) throw new GraphQLError('Cliente no encontrado');

    const vendedor = ctx.usuario.id.toString();
    if (cliente.vendedor.toString() !== vendedor) {
      throw new GraphQLError('No tienes las credenciales');
    }

    cliente = await Cliente.findOneAndUpdate({ _id: id }, input, { new: true });

    return cliente;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo actualizar el cliente. Error en la base de datos: ' +
        error.message,
    );
  }
};

const eliminarCliente = async (_, { id }, ctx) => {
  try {
    let cliente = await Cliente.findById(id);
    if (!cliente) throw new GraphQLError('Cliente no encontrado');

    const vendedor = ctx.usuario.id.toString();
    if (cliente.vendedor.toString() !== vendedor) {
      throw new GraphQLError('No tienes las credenciales');
    }

    await Cliente.findOneAndDelete({ _id: id });
    return 'Cliente eliminado';
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo eliminar el cliente. Error en la base de datos: ' +
        error.message,
    );
  }
};

const queries = {
  obtenerClientes,
  obtenerClientesVendedor,
  obtenerCliente,
};

const mutations = {
  nuevoCliente,
  actualizarCliente,
  eliminarCliente,
};

export { mutations, queries };
