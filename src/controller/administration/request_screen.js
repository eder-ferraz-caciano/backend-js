const validate = require('validate.js');

/**
 * @author Eder Ferraz Caciano
 * @class Request-Screen
 * @description Request-Screen Controller Class
 * @param {this} app
 */
module.exports = app => {
  const { hookUpdate, hookDelete } = app.src.middleware.knexHook;

  const SaveValidate = {
    screen_id: { presence: { allowEmpty: false, numericality: true } },
    description: { presence: { allowEmpty: false } },
    url: { presence: { allowEmpty: false } },
    note: { presence: { allowEmpty: false } }
  };
  const EditValidate = {
    id: { presence: { allowEmpty: false, numericality: true } },
    ...SaveValidate
  };

  const onList = async (req, res) => {
    try {
      const findAllScreen = await app.db('request_screen')
      .join('screen', 'request_screen.screen_id', '=', 'screen.id')
      .select(
        'request_screen.id',
        'request_screen.screen_id',
        'screen.name',
        'request_screen.description',
        'request_screen.url',
        'request_screen.note'
      )
      .where({
        'request_screen.deleted_at': null,
        'screen.deleted_at': null
      });
  
      return res.json({ registros: findAllScreen });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onView = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: 'Uninformed request!' });

      const findScrenn = await app.db('request_screen')
      .join('screen', 'request_screen.screen_id', '=', 'screen.id')
      .select(
        'request_screen.id',
        'request_screen.screen_id',
        'screen.name',
        'request_screen.description',
        'request_screen.url',
        'request_screen.note'
      )
      .where({
        'request_screen.id': req.params.id,
        'request_screen.deleted_at': null,
        'screen.deleted_at': null
      });

      if (findScrenn && !findScrenn.length) return res.json({ erro: 'Request not found!' });

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
      screen.note = screen.note ? screen.note.toUpperCase() : '';
      screen.description = screen.description ? screen.description.toUpperCase() : '';

      const findScreen = await app.db('screen')
      .where({
        deleted_at: null,
        id: screen.screen_id
      });
      if (findScreen && !findScreen.length) {
        return res.json({ erro: `Screen not found!` });
      }

      const findRequest = await app.db('request_screen')
      .where({
        url: screen.url,
        screen_id: screen.screen_id,
        deleted_at: null
      });
      if (findRequest && findRequest.length) {
        return res.json({ erro: `Request already registered!` });
      }

      const response = await app.db('request_screen')
      .insert({
        ...screen
      });

      return res.json({ message: 'Request successfully inserted', screenId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onEdit = async (req, res) => {
    let erro = validate(req.body, EditValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let screen = { ...req.body };
      screen.note = screen.note ? screen.note.toUpperCase() : '';
      screen.description = screen.description ? screen.description.toUpperCase() : '';

      hookUpdate(screen);

      const findScreen = await app.db('screen')
      .where({
        deleted_at: null,
        id: screen.screen_id
      });
      if (findScreen && !findScreen.length) {
        return res.json({ erro: `Screen not found!` });
      }
      
      const findRequest = await app.db('request_screen')
      .where({
        id: screen.id,
        deleted_at: null
      });
      if (findRequest && !findRequest.length) {
        return res.json({ erro: 'Request not found!' });
      }

      const response = await app.db('request_screen')
      .where({
        deleted_at: null,
        id: screen.id
      })
      .update({
        ...screen
      });

      return res.json({ message: 'Request successfully inserted', requestId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onDelete = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: 'Uninformed request!' });

      let screen = { id: req.params.id };
      hookDelete(screen);

      const findScreen = await app.db('request_screen')
      .where({
        deleted_at: null,
        id: req.params.id
      });

      if (findScreen && !findScreen.length) return res.json({ erro: 'Request not found!' });

      await app.db('request_screen')
      .where({
        deleted_at: null,
        id: req.params.id
      })
      .update({
        ...screen
      });

      return res.json({ message: 'Deleted request!' });
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
