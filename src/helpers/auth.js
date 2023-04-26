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

export default {
  crearToken,
  leerToken,
};
