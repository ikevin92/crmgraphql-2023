const Producto = require('../models/Producto');

const nuevoProducto = async (_, { input }) => {
  try {
    const producto = new Producto(input);
    const resultado = await producto.save();
    return resultado;
  } catch (error) {
    console.log(error);
    throw new Error('Ocurrió un error', error);
  }
};

const obtenerProductos = async () => {
  try {
    const productos = await Producto.find({});
    return productos;
  } catch (error) {
    console.log(error);
    throw new Error('Ocurrió un error', error);
  }
};

const obtenerProducto = async (_, { id }) => {
  try {
    const producto = await Producto.findById(id);
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
  } catch (error) {
    console.log(error);
    throw new Error('Ocurrió un error', error);
  }
};

module.exports = {
  nuevoProducto,
  obtenerProductos,
  obtenerProducto,
};
