const queries = `#graphql
  type Query {
    # Usuarios
    obtenerUsuario(token: String!): Usuario
    # Productos
    obtenerProductos: [Producto]
    obtenerProducto(id: ID!): Producto
    # Clientes
    obtenerClientes: [Cliente]
    obtenerClientesVendedor: [Cliente]
    obtenerCliente(id: ID!): Cliente
    # Pedidos
    obtenerPedidos: [Pedido]
    obtenerPedidosVendedor: [Pedido]
    obtenerPedido(id: ID!): Pedido
    obtenerPedidosEstado(estado: String!): [Pedido]
    # Busquedas Avanzadas
    mejoresClientes: [TopCliente]
    mejoresVendedores: [TopVendedor]
    buscarProducto(texto: String!): [Producto]
  }
`;

export { queries };
