import bcryptjs from 'bcryptjs';
import authHelpers from '../helpers/auth.js';
import Usuario from '../models/Usuario.js';
import { GraphQLError } from 'graphql';

const { genSalt, hash, compare } = bcryptjs;
const { crearToken, leerToken } = authHelpers;

const crearUsuario = async (_, { input }) => {
  try {
    const { email, password } = input;

    // revisar si el usuario ya esta registrado
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario)
      throw new Error('El usuario esta registrado en la base de datos');

    // Hash  password
    const salt = await genSalt(10);
    input.password = await hash(password, salt);

    // guardar en la base de datos
    const usuario = new Usuario(input);

    usuario.save(); // guardar
    return usuario;
  } catch (error) {
    console.log(error);
    throw new Error('Ocurrió un error', error);
  }
};

const autenticarUsuario = async (_, { input }) => {
  const { email, password } = input;

  // revisar si el usuario ya esta registrado
  const existeUsuario = await Usuario.findOne({ email });

  if (!existeUsuario) throw new Error('El usuario no existe');

  // revisar si el password es correcto
  const passwordCorrecto = await compare(password, existeUsuario.password);

  if (!passwordCorrecto) throw new Error('El password es incorrecto');

  // crear el token
  return {
    token: crearToken({
      usuario: existeUsuario,
      expiresIn: '24h',
    }),
  };
};

const obtenerUsuario = async (_, { token }) => {
  try {
    const usuarioToken = leerToken(token);
    const usuario = await Usuario.findById(usuarioToken.id);
    if (!usuario)
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });

    return usuario;
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Ocurrió un error');
  }
};

export {
  // Mutation
  crearUsuario,
  autenticarUsuario,
  // Query
  obtenerUsuario,
};
