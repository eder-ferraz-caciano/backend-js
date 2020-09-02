module.exports = app => {
  app.route('/user/listar').get(app.src.controller.administration.user.onList)
  app.route('/user/salvar').post(app.src.controller.administration.user.onSave)
  app.route('/user/editar').put(app.src.controller.administration.user.onEdit)
  app.route('/user/deletar/:id').delete(app.src.controller.administration.user.onDelete)
  app.route('/user/exibir/:id').get(app.src.controller.administration.user.onView)
}
