const dayjs = require('dayjs');

module.exports = app => {
  const { userToken } = app.src.helpers.usuario;

  function hookUpdate(dados, req) {
    dados.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    dados.updated_by = req ? userToken(req).name : 'system';

    return dados;
  }

  function hookCreate(dados, req) {
    dados.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    dados.created_by = req ? userToken(req).name : 'system';

    return dados;
  }

  function hookDelete(dados, req) {
    dados.deleted_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    dados.deleted_by = req ? userToken(req).name : 'system';

    return dados;
  }

  return { hookUpdate, hookCreate, hookDelete };
};
