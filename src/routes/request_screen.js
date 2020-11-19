module.exports = app => {

    app.route("/request-screen/listar")
        .all(app.src.core.passport.authenticate())
        .get(app.src.controller.administration.request_screen.onList);

    app.route("/request-screen/salvar")
        .all(app.src.core.passport.authenticate())
        .post(app.src.controller.administration.request_screen.onSave);

    app.route("/request-screen/editar")
        .all(app.src.core.passport.authenticate())
        .put(app.src.controller.administration.request_screen.onEdit);

    app.route("/request-screen/deletar/:id")
        .all(app.src.core.passport.authenticate())
        .delete(app.src.controller.administration.request_screen.onDelete);

    app.route("/request-screen/exibir/:id")
        .all(app.src.core.passport.authenticate())
        .get(app.src.controller.administration.request_screen.onView);

};
