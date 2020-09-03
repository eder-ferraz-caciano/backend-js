module.exports = app => {
  app.route('/login')
  .post(app.src.controller.auth.login);

  app.route('/validateToken')
  .post(app.src.controller.auth.validateToken);
};
