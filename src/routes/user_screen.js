module.exports = app => {

  app.route("/user-screen/telas-usuario/:userId")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .get(app.src.controller.administration.user_screen.onListScreensOfUser);

  app.route("/user-screen/usuarios-tela/:screenId")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .get(app.src.controller.administration.user_screen.onListUsersOfScreen);

  app.route("/user-screen/salvar")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .post(app.src.controller.administration.user_screen.onSave);

  app.route("/user-screen/deletar/:id")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .delete(app.src.controller.administration.user_screen.onDelete);

};
