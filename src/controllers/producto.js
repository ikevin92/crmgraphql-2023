import { GraphQLError } from 'graphql';
import Producto from '../models/Producto.js';

const nuevoProducto = async (_, { input }) => {
  try {
    const producto = new Producto(input);
    const resultado = await producto.save();

    return resultado;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo crear el producto. Error en la base de datos: ' +
        error.message,
    );
  }
};

const obtenerProductos = async () => {
  try {
    const productos = await find({});

    return productos;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudieron obtener los productos. Error en la base de datos: ' +
        error.message,
    );
  }
};

const obtenerProducto = async (_, { id }) => {
  try {
    const producto = await Producto.findById(id);
    if (!producto)
      throw new GraphQLError(
        'No se encontró el producto con el id especificado',
      );

    return producto;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo obtener el producto. Error en la base de datos: ' +
        error.message,
    );
  }
};

const actualizarProducto = async (_, { id, input }) => {
  try {
    let producto = await Producto.findById(id);
    if (!producto)
      throw new GraphQLError(
        'No se encontró el producto con el id especificado',
      );

    producto = await Producto.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });

    return producto;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo actualizar el producto. Error en la base de datos: ' +
        error.message,
    );
  }
};

const eliminarProducto = async (_, { id }) => {
  try {
    let producto = await Producto.findById(id);
    if (!producto) throw new GraphQLError('Producto no encontrado');

    await Producto.findOneAndDelete({ _id: id });

    return 'Producto eliminado';
  } catch (error) {
    console.log(error);
    throw new GraphQLError('No se pudo eliminar el producto: ' + error.message);
  }
};

const buscarProducto = async (_, { texto }) => {
  try {
    const productos = await Producto.find({ $text: { $search: texto } }).limit(
      10,
    );

    return productos;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      'No se pudo realizar la búsqueda. Error en la base de datos: ' +
        error.message,
    );
  }
};

const mutations = {
  nuevoProducto,
  actualizarProducto,
  eliminarProducto,
};

const queries = {
  obtenerProductos,
  obtenerProducto,
  buscarProducto,
};

export { mutations, queries };
