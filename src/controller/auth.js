/* eslint-disable no-undef */
const jwt = require('jwt-simple');
const validate = require('validate.js');


module.exports = app => {
  const userValidate = {
    login: { presence: { allowEmpty: false } },
    password: { presence: { allowEmpty: false } }
  };

  const login = async (req, res) => {
    const erros = validate(req.body, userValidate);
    if (erros) return res.json({ erro: erros });

    try {
      const user = {...req.body};
      user.login = req.body.login.toUpperCase();

      const findUser = await app.db('user')
      .where({
        login: user.login,
        password: user.password
      })
      .first();

      if (!findUser) return res.json({ erro: 'User not found!' });

      if (String(req.body.password) !== String(findUser.password)) {
        return res.json({ erro: 'User or password not found!' });
      }

      const now = Math.floor(Date.now() / 1000);
      console.log(now);

      const payload = {
        id: findUser.id,
        name: findUser.name,
        login: findUser.login,
        email: findUser.email,
        iat: now,
        exp: now + (60 * 60 * 24)
      };

      res.json({
        ...payload,
        token: jwt.encode(payload, process.env.APP_KEY)
      });
    } catch (error) {
      res.send({ aviso: 'Request error.', erro: error });
    }
  };

  const validateToken = async (req, res) => {
    const userData = req.body || null;
    try {
      if (userData) {
        const token = jwt.decode(userData.token, process.env.APP_KEY);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (error) {
      return res.json({ erro: error });
    }
    res.send(false);
  };

  return { login, validateToken };
};
