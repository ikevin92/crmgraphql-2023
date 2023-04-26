import authHelper from '../helpers/auth.js';

const { leerToken } = authHelper;

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

const context = async ({ req }) => {
  const usuario = await obtenerUsuarioByToken(req);
  return { usuario };
};

export { context };
