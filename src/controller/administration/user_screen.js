const validate = require('validate.js');

/**
 * @author Eder Ferraz Caciano
 * @class User Screen
 * @description User Screen Controller Class
 * @param {this} app
 */
module.exports = app => {
  const { hookDelete } = app.src.middleware.knexHook;

  const SaveValidate = {
    name: { presence: { allowEmpty: false } },
    description: { presence: { allowEmpty: false } }
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

  const onDelete = async (req, res) => {
    try {
      let userScreen = req.params.id;
      hookDelete(userScreen);

      const findUserScreen = await app.db('user_screen')
      .where({
        deleted_at: null,
        id: userScreen.id
      });
      if (findUserScreen && !findUserScreen.length) {
        return res.json({ erro: 'User Screen not found!' });
      }

      await app.db('user_screen')
      .where({
        deleted_at: null,
        id: req.params.id
      })
      .update({
        ...userScreen
      });

      return res.json({ message: 'Deleted user screen!' });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  return {
    onList,
    onSave,
    onDelete
  };
};
