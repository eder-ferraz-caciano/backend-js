module.exports = app => {
  const authorization = async (req, res, next) => {
    // pesquisa usuário
    const findUser = await app.db("user")
      .where({
        deleted_at: null,
        login: req.user.login
      })
      .first();

    // pesquisa Requisição
    const findRequest = await app.db("request_screen")
      .where({
        deleted_at: null,
        url: req.route.path
      })
      .first();

    // pesquisar Relacionamento User X Request
    if (findRequest.id && findUser.id) {
      const findPermission = await app.db("user_request")
        .where({
          deleted_at: null,
          request_id: findRequest ? findRequest.id : undefined,
          user_id: findUser ? findUser.id : undefined
        })
        .first();

      if (findPermission && findPermission.id) next()
      else return res.status(401).send("Usuário Sem Permissão")
    } else {

      return res.status(401).send("Usuário Sem Permissão")
    }
  };

  return { authorization: () => authorization }
}
