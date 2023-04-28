const types = `#graphql
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: String
    createdAt: String
    updatedAt: String
  }

  type Producto {
    id: ID
    nombre: String
    existencia: Int
    precio: Float
    creado: String
    createdAt: String
    updatedAt: String
  }

  type Cliente {
    id: ID
    nombre: String
    apellido: String
    empresa: String
    email: String
    telefono: String
    vendedor: ID
    creado: String
    createdAt: String
    updatedAt: String
  }

  type Pedido {
    id: ID
    pedido: [PedidoGrupo]
    total: Float
    cliente: Cliente
    vendedor: ID
    estado: EstadoPedido
    createdAt: String
    updatedAt: String
  }

  type PedidoGrupo {
    id: ID
    cantidad: Int
  }

  enum EstadoPedido {
    PENDIENTE
    COMPLETADO
    CANCELADO
  }

  type Token {
    token: String
  }
`;

export { types };
