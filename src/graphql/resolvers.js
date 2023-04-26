import {
  nuevoProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/producto.js';

import {
  crearUsuario,
  autenticarUsuario,
  obtenerUsuario,
} from '../controllers/usuario.js';

import {
  nuevoCliente,
  obtenerClientes,
  obtenerClientesVendedor,
} from '../controllers/cliente.js';

// resolvers
const resolvers = {
  Query: {
    // Usuarios
    obtenerUsuario,
    //Productos
    obtenerProductos,
    obtenerProducto,
    // Clientes
    obtenerClientes,
    obtenerClientesVendedor,
  },
  Mutation: {
    //Usuario
    crearUsuario,
    autenticarUsuario,
    //Producto
    nuevoProducto,
    actualizarProducto,
    eliminarProducto,
    //Cliente
    nuevoCliente,
  },
};

export { resolvers };
