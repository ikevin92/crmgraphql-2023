const Producto = require('../models/Producto');

const nuevoProducto = async (_, { input }) => {
  try {
    const producto = new Producto(input);
    const resultado = await producto.save();

    return resultado;
  } catch (error) {
    console.log(error);
    throw new Error(
      'No se pudo crear el producto. Error en la base de datos: ' +
        error.message,
    );
  }
};

const obtenerProductos = async () => {
  try {
    const productos = await Producto.find({});

    return productos;
  } catch (error) {
    console.log(error);
    throw new Error(
      'No se pudieron obtener los productos. Error en la base de datos: ' +
        error.message,
    );
  }
};

const obtenerProducto = async (_, { id }) => {
  try {
    const producto = await Producto.findById(id);
    if (!producto)
      throw new Error('No se encontró el producto con el id especificado');

    return producto;
  } catch (error) {
    console.log(error);
    throw new Error(
      'No se pudo obtener el producto. Error en la base de datos: ' +
        error.message,
    );
  }
};

const actualizarProducto = async (_, { id, input }) => {
  try {
    let producto = await Producto.findById(id);
    if (!producto)
      throw new Error('No se encontró el producto con el id especificado');

    producto = await Producto.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });

    return producto;
  } catch (error) {
    console.log(error);
    throw new Error(
      'No se pudo actualizar el producto. Error en la base de datos: ' +
        error.message,
    );
  }
};

const eliminarProducto = async (_, { id }) => {
  try {
    let producto = await Producto.findById(id);
    if (!producto) throw new Error('Producto no encontrado');

    await Producto.findOneAndDelete({ _id: id });

    return 'Producto eliminado';
  } catch (error) {
    console.log(error);
    throw new Error('No se pudo eliminar el producto: ' + error.message);
  }
};

module.exports = {
  // Mutation
  nuevoProducto,
  actualizarProducto,
  eliminarProducto,
  // Query
  obtenerProductos,
  obtenerProducto,
};