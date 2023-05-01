import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const { config } = dotenv;
config({ path: 'variables.env' });

const crearToken = ({ usuario, expiresIn }) => {
  const { id, email, nombre, apellido } = usuario;

  return jwt.sign({ id, email, nombre, apellido }, process.env.SECRETA, {
    expiresIn,
  });
};

const leerToken = (token) => {
  return jwt.verify(token, process.env.SECRETA);
};

const obtenerUsuarioByToken = async (req) => {
  try {
    let usuario = {};
    const token = req.headers['authorization'] || '';
    if (!token) return usuario;
    // const usuario = leerToken(token.replace('Bearer ', ''));
    usuario = leerToken(token);
    return usuario;
  } catch (error) {
    console.log('hubo un error en el context', error);
    return {};
  }
};

export default {
  crearToken,
  leerToken,
  obtenerUsuarioByToken,
};
