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

// resolvers
const resolvers = {
  Query: {
    // Usuarios
    obtenerUsuario,
    //Productos
    obtenerProductos,
    obtenerProducto,
  },
  Mutation: {
    //Usuario
    crearUsuario,
    autenticarUsuario,
    //Producto
    nuevoProducto,
    actualizarProducto,
    eliminarProducto,
  },
};

module.exports = resolvers;
