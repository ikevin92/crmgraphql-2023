import {
  mutations as mutationProducto,
  queries as queryProducto,
} from '../controllers/producto.js';

import {
  mutations as mutationUsuario,
  queries as queryUsuario,
} from '../controllers/usuario.js';

import {
  mutations as mutationCiente,
  queries as queryCliente,
} from '../controllers/cliente.js';

import {
  mutations as mutationPedido,
  queries as queryPedido,
} from '../controllers/pedido.js';

// resolvers
const resolvers = {
  Query: {
    // Usuarios
    ...queryUsuario,
    //Productos
    ...queryProducto,
    // Clientes
    ...queryCliente,
    // Pedidos
    ...queryPedido,
  },
  Mutation: {
    //Usuario
    ...mutationUsuario,
    //Producto
    ...mutationProducto,
    //Cliente
    ...mutationCiente,
    // Pedido
    ...mutationPedido,
  },
};

export { resolvers };
