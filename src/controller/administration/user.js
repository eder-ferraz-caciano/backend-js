const validate = require('validate.js');
const dayjs = require('dayjs');
const crypto = require('crypto');

module.exports = app => {
  const { hookUpdate, hookDelete } = app.src.middleware.knexHook
  let SaveValidate = {
    name: { presence: { allowEmpty: false } },
    login: { presence: { allowEmpty: false } },
    password: { presence: { allowEmpty: false } },
    confirmPassword: { presence: { allowEmpty: false }, equality: 'password' },
    email: { email: { message: "Doesn't look like a valid email" }}
  }
  let userEdit = {
    id: { presence: { allowEmpty: false, numericality: true } },
    ...SaveValidate
  }

  const criptografarSenha = password => {
    return crypto.createHash('sha256').update(password).digest('hex')
  }

  const onList = async (req, res) => {
    try {
      const response = await app.db('user').where({
        deleted_at: null
      });
  
      return res.json({ registros: response });
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const onView = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: 'Uninformed user!' })

      const findUser = await app.db().column('id', 'name', 'login', 'email', 'birth_date', 'url_photograph', 'telephone', 'theme')
      .select()
      .from('user')
      .where({
        id: req.params.id,
        deleted_at: null
      });

      if (findUser && !findUser.length) return res.json({ erro: 'User not found!' })

      return res.json({ ...findUser[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const onSave = async (req, res) => {
    let erro = validate(req.body, SaveValidate);
    if (erro) return res.json({ erro: erro });
    try {
      let user = { ...req.body };
      user.login = user.login.toUpperCase();
      user.email = user.email ? user.email : ''
      user.password = user.password ? String(criptografarSenha(user.password)) : null
      user.created_by = user.login;
      user.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
      delete user.confirmPassword;
      
      const findUser = await app.db('user').where({
        login: user.login,
        email: user.email,
        deleted_at: null
      });
      
      if (findUser && findUser.length) {
        return res.json({
          erro: `User already registered! <br> Name:${user.name} Login:${user.login} Email:${user.email}`
        })
      };

      const response = await app.db('user').insert({
        ...user
      });

      return res.json({ message: 'User successfully inserted', userId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const onEdit = async (req, res) => {
    let erro = validate(req.body, userEdit);
    if (erro) return res.json({ erro: erro });
    try {
      let user = { ...req.body };
      user.login = user.login.toUpperCase();
      user.email = user.email ? user.email : ''
      user.password = user.password ? String(criptografarSenha(user.password)) : null
      user.created_by = user.login;
      user.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
      delete user.confirmPassword;

      hookUpdate(user);
      
      const findUser = await app.db('user').where({
        id: user.id,
        deleted_at: null
      });
      
      if (findUser && !findUser.length) return res.json({ erro: 'User not found!' });

      const response = await app.db('user')
      .where({
        deleted_at: null,
        id: user.id
      })
      .update({
        ...user
      });

      return res.json({ message: 'User successfully inserted', userId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  const onDelete = async (req, res) => {
    try {
      let user = { id: req.params.id }
      hookDelete(user)
      if (!req.params.id) return res.json({ erro: 'Uninformed user!' })

      const findUser = await app.db('user')
      .where({
        deleted_at: null,
        id: req.params.id
      })
      console.log(findUser);
      if (findUser && !findUser.length) return res.json({ erro: 'User not found!' })


      const response = await app.db('user')
      .where({
        deleted_at: null,
        id: req.params.id
      })
      .update({
        ...user
      })

      return res.json({ message: 'Deleted user!' })
    } catch (error) {
      return res.json({ erro: error });
    }
  }

  return {
    onList,
    onView,
    onEdit,
    onSave,
    onDelete
  }
}
