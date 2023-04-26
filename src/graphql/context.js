const { leerToken } = require('../helpers/auth');

const obtenerUsuario = ({ req }) => {
  console.log('obtener usuario');
  const token = req.headers['authorization'] || '';
  if (token) {
    try {
      // const usuario = leerToken(token.replace('Bearer ', ''));
      const usuario = leerToken(token);
      return {
        usuario,
      };
    } catch (error) {
      console.log('hubo un error en el context', error);
    }
  }
};

// const context = {
//   ...obtenerUsuario,
// };

module.exports = { obtenerUsuario };
