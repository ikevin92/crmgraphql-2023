const typeDefs = `#graphql
  #Types
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

  type Token {
    token: String
  }

  # Inputs
  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  input ProductoInput {
    nombre: String!
    existencia: Int!
    precio: Float!
  }

  input ClienteInput {
    nombre: String!
    apellido: String!
    empresa: String!
    email: String!
    telefono: String
  }

  # Query - Mutations

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
  }

  type Mutation {
    #Usuarios
    crearUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
    # Productos
    nuevoProducto(input: ProductoInput): Producto
    actualizarProducto(id: ID!, input: ProductoInput): Producto
    eliminarProducto(id: ID!): String
    # Clientes
    nuevoCliente(input: ClienteInput): Cliente
  }
`;

export { typeDefs };
