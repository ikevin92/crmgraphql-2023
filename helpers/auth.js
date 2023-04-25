const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: 'variables.env' });

const crearToken = ({ usuario, expiresIn }) => {
  const { id, email, nombre, apellido } = usuario;

  return jwt.sign({ id, email, nombre, apellido }, process.env.SECRETA, {
    expiresIn,
  });
};

const leerToken = (token) => {
  return jwt.verify(token, process.env.SECRETA);
};

module.exports = {
  crearToken,
  leerToken,
};
