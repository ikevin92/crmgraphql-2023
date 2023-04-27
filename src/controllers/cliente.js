import Cliente from '../models/Cliente.js';

const nuevoCliente = async (_, { input }, ctx) => {
  try {
    const { email } = input;
    const cliente = await Cliente.findOne({ email });

    if (cliente) throw new Error('El cliente ya existe');

    const nuevoCliente = new Cliente(input);
    nuevoCliente.vendedor = ctx.usuario.id;
    const resultado = await nuevoCliente.save();

    return resultado;
  } catch (error) {
    console.log(error);
    throw new Error(
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
    throw new Error(
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
    throw new Error(
      'No se pudo obtener los clientes. Error en la base de datos: ' +
        error.message,
    );
  }
};

const obtenerCliente = async (_, { id }, ctx) => {
  const cliente = await Cliente.findById(id);
  if (!cliente) throw new Error('Cliente no encontrado');

  const vendedor = ctx.usuario.id.toString();
  if (cliente.vendedor.toString() !== vendedor) {
    throw new Error('No tienes las credenciales');
  }

  return cliente;
};

export {
  nuevoCliente,
  obtenerClientes,
  obtenerClientesVendedor,
  obtenerCliente,
};
