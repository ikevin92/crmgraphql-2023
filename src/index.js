import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { conectarDB } from './config/db.js';
import { typeDefs, resolvers, context } from './graphql/schema.js';

console.log('index');
// conectar a la base de datos
conectarDB();

// servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// arrancar el servidor
const { url } = await startStandaloneServer(server, {
  context: context,
  // context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
