const validate = require('validate.js');

/**
 * @author Eder Ferraz Caciano
 * @class Screen
 * @description Screen Controller Class
 * @param {this} app
 */
module.exports = app => {
  const { hookUpdate, hookDelete } = app.src.middleware.knexHook;

  const SaveValidate = {
    name: { presence: { allowEmpty: false } },
    description: { presence: { allowEmpty: false } }
  };
  const EditValidate = {
    id: { presence: { allowEmpty: false, numericality: true } },
    ...SaveValidate
  };

  const onList = async (req, res) => {
    try {
      const findAllScreen = await app.db('screen')
      .column(
        'id',
        'name',
        'description'
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
      if (!req.params.id) return res.json({ erro: 'Uninformed screen!' });

      const findScrenn = await app.db('screen')
      .column(
        'id',
        'name',
        'description'
      )
      .select()
      .where({
        id: req.params.id,
        deleted_at: null
      });

      if (findScrenn && !findScrenn.length) return res.json({ erro: 'Screen not found!' });

      return res.json({ ...findScrenn[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onSave = async (req, res) => {
    let erro = validate(req.body, SaveValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let screen = { ...req.body };
      screen.name = screen.name ? screen.name.toUpperCase() : '';
      screen.description = screen.description ? screen.description.toUpperCase() : '';

      const findScreen = await app.db('screen')
      .where({
        name: screen.name,
        deleted_at: null
      });
      
      if (findScreen && findScreen.length) {
        return res.json({
          erro: `Screen already registered!`
        });
      }

      const response = await app.db('screen')
      .insert({
        ...screen
      });

      return res.json({ message: 'Screen successfully inserted', screenId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onEdit = async (req, res) => {
    let erro = validate(req.body, EditValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let screen = { ...req.body };
      screen.name = screen.name ? screen.name.toUpperCase() : '';
      screen.description = screen.description ? screen.description.toUpperCase() : '';

      hookUpdate(screen);
      
      const findScreen = await app.db('screen')
      .where({
        id: screen.id,
        deleted_at: null
      });
      
      if (findScreen && !findScreen.length) return res.json({ erro: 'Screen not found!' });

      const response = await app.db('screen')
      .where({
        deleted_at: null,
        id: screen.id
      })
      .update({
        ...screen
      });

      return res.json({ message: 'Screen successfully inserted', screenId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onDelete = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: 'Uninformed screen!' });

      let screen = { id: req.params.id };
      hookDelete(screen);

      const findScreen = await app.db('screen')
      .where({
        deleted_at: null,
        id: req.params.id
      });
      if (findScreen && !findScreen.length) {
        return res.json({ erro: 'Screen not found!' });
      }

      await app.db('request_screen')
      .where({
        'request_screen.screen_id': req.params.id,
        deleted_at: null
      })
      .update({
        deleted_at: screen.deleted_at,
        deleted_by: screen.deleted_by
      });

      await app.db('screen')
      .where({
        deleted_at: null,
        id: req.params.id
      })
      .update({
        ...screen
      });

      return res.json({ message: 'Deleted screen!' });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  return {
    onList,
    onView,
    onEdit,
    onSave,
    onDelete
  };
};
