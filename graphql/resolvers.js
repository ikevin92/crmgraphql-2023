const {
  nuevoProducto,
  obtenerProductos,
  obtenerProducto,
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
  },
};

module.exports = resolvers;
