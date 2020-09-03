module.exports = app => {
  app.route('/user/listar')
  .all(app.src.core.passport.authenticate())
  .get(app.src.controller.administration.user.onList);

  app.route('/user/salvar')
  .post(app.src.controller.administration.user.onSave);

  app.route('/user/editar')
  .all(app.src.core.passport.authenticate())
  .put(app.src.controller.administration.user.onEdit);

  app.route('/user/deletar/:id')
  .all(app.src.core.passport.authenticate())
  .delete(app.src.controller.administration.user.onDelete);

  app.route('/user/exibir/:id')
  .all(app.src.core.passport.authenticate())
  .get(app.src.controller.administration.user.onView);
};
