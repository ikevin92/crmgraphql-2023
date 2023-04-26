const { ApolloServer } = require('apollo-server');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
const { obtenerUsuario } = require('./graphql/context');
const conectarDB = require('./config/db');

// conectar a la base de datos
conectarDB();

// servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: obtenerUsuario,
});

// arrancar el servidor
server.listen().then(({ url }) => {
  console.log(`Servidor listo en la URL ${url}`);
});
