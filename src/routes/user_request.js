module.exports = app => {

  app.route("/user-request/listar/:userId")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .get(app.src.controller.administration.user_request.onListRequestOfUser);

  app.route("/user-request/salvar")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .post(app.src.controller.administration.user_request.onSave);

  app.route("/user-request/deletar/:id")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .delete(app.src.controller.administration.user_request.onDelete);

};
