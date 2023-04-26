const {
  nuevoProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/producto');

const {
  crearUsuario,
  autenticarUsuario,
  obtenerUsuario,
} = require('../controllers/usuario');

const {
  nuevoCliente,
  obtenerClientes,
  obtenerClientesVendedor,
} = require('../controllers/cliente');

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

module.exports = resolvers;
