import authHelper from '../helpers/auth.js';

const { obtenerUsuarioByToken } = authHelper;

const context = async ({ req }) => {
  const usuario = await obtenerUsuarioByToken(req);
  return { usuario };
};

export { context };
