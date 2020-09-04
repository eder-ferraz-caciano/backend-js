module.exports = app => {
  app.route('/user-screen/listar-users/:screenId')
  .all(app.src.core.passport.authenticate())
  .get(app.src.controller.administration.user_screen.onListScreenUser);
};
