const validate = require("validate.js");

/**
 * @author Eder Ferraz Caciano
 * @class Screen
 * @description Screen Controller Class
 * @param {this} app
 */
module.exports = app => {

  const { hookCreate, hookUpdate, hookDelete } = app.src.middleware.knexHook;

  const SaveValidate = {
    description: { presence: { allowEmpty: false } },
    name: { presence: { allowEmpty: false } },
    url: { presence: { allowEmpty: false } }
  };
  const EditValidate = {
    id: { presence: { allowEmpty: false, numericality: true } },
    ...SaveValidate
  };

  const onList = async (_req, res) => {
    try {
      const findAllScreen = await app.db("screen")
        .column(
          "id",
          "name",
          "description",
          "url",
          "icon",
          "order",
          "icon_color"
        )
        .select()
        .where({
          deleted_at: null
        });

      return res.json({ registros: findAllScreen });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onView = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: "Uninformed screen!" });

      const findScren = await app.db("screen")
        .column(
          "id",
          "name",
          "description",
          "url",
          "icon",
          "order",
          "icon_color"
        )
        .select()
        .where({
          deleted_at: null,
          id: req.params.id
        });

      if (findScren && !findScren.length) return res.json({ erro: "Screen not found!" });

      return res.json({ ...findScren[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onSave = async (req, res) => {

    let erro = validate(req.body, SaveValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let screen = { ...req.body };
      screen.name = screen.name ? screen.name.toUpperCase() : "";
      screen.description = screen.description ? screen.description.toUpperCase() : "";
      hookCreate(screen);

      const findScreen = await app.db("screen")
        .where({
          deleted_at: null,
          name: screen.name
        });

      if (findScreen && findScreen.length) {
        return res.json({
          erro: "Screen already registered!"
        });
      }

      const response = await app.db("screen")
        .insert({
          ...screen
        });

      return res.json({ message: "Screen successfully inserted", screenId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onEdit = async (req, res) => {

    let erro = validate(req.body, EditValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let screen = { ...req.body };
      screen.name = screen.name ? screen.name.toUpperCase() : "";
      screen.description = screen.description ? screen.description.toUpperCase() : "";
      hookUpdate(screen);

      const findScreen = await app.db("screen")
        .where({
          deleted_at: null,
          id: screen.id
        });

      if (findScreen && !findScreen.length) return res.json({ erro: "Screen not found!" });

      const response = await app.db("screen")
        .where({
          deleted_at: null,
          id: screen.id
        })
        .update({
          ...screen
        });

      return res.json({ message: "Screen successfully inserted", screenId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onDelete = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: "Uninformed screen!" });

      let screen = { id: req.params.id };
      hookDelete(screen);

      const findScreen = await app.db("screen")
        .where({
          deleted_at: null,
          id: req.params.id
        });
      if (findScreen && !findScreen.length) {
        return res.json({ erro: "Screen not found!" });
      }

      await app.db("request_screen")
        .where({
          deleted_at: null,
          "request_screen.screen_id": req.params.id
        })
        .update({
          deleted_at: screen.deleted_at,
          deleted_by: screen.deleted_by
        });

      await app.db("screen")
        .where({
          deleted_at: null,
          id: req.params.id
        })
        .update({
          ...screen
        });

      return res.json({ message: "Deleted screen!" });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  return {
    onDelete,
    onEdit,
    onList,
    onSave,
    onView
  };
};
