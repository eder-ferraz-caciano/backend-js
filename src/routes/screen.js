module.exports = app => {

    app.route("/screen/listar")
        .all(app.src.core.passport.authenticate())
        .get(app.src.controller.administration.screen.onList);

    app.route("/screen/salvar")
        .all(app.src.core.passport.authenticate())
        .post(app.src.controller.administration.screen.onSave);

    app.route("/screen/editar")
        .all(app.src.core.passport.authenticate())
        .put(app.src.controller.administration.screen.onEdit);

    app.route("/screen/deletar/:id")
        .all(app.src.core.passport.authenticate())
        .delete(app.src.controller.administration.screen.onDelete);

    app.route("/screen/exibir/:id")
        .all(app.src.core.passport.authenticate())
        .get(app.src.controller.administration.screen.onView);

};
