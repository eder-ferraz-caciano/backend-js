const jwt = require('jwt-simple')
const validate = require('validate.js')


module.exports = app => {
  const { seExiste, seAtivo } = app.api.validations

  const usuarioValidar = {
    login: { presence: { allowEmpty: false, message: '^Login de usuário não informado.' } },
    password: { presence: { allowEmpty: false, message: '^Senha de usuário não informada.' } }
  }

  const signin = async (req, res) => {
    const userBody = { ...req.body }

    const erros = validate(userBody, usuarioValidar)
    if (erros) return res.json({erro: erros})

    try {
      const user = await app.db('system_user')
        .where({ login: req.body.login })
        .first()

      seExiste(user, 'Usuário não encontrado')
      seAtivo(user.active, 'Usuário desativado. Contate o administrador do sistema!')

      const now = Math.floor(Date.now() / 1000)

      seExiste(req.body.password, 'Usuário ou senha incorreto.')
      if (String(req.body.password) !== String(user.password)) {
        return res.json({
          erro: 'Usuário ou senha Incorretos.',
          aviso: 'Tente novamente.'
        })
      }

      const payload = {
        id: user.id,
        name: user.name,
        login: user.login,
        email: user.email,
        active: user.active,
        iat: now,
        exp: now + (60 * 60 * 24)
      }

      res.json({
        ...payload,
        token: jwt.encode(payload, process.env.APP_KEY)
      })
    } catch (error) {
      res.send({ aviso: 'Erro na requisição.', erro: error })
    }
  }

  const validateToken = async (req, res) => {
    const userData = req.body || null
    try {
      if (userData) {
        const token = jwt.decode(userData.token, process.env.APP_KEY)
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true)
        }
      }
    } catch (error) {

    }
    res.send(false)
  }

  return { signin, validateToken }
}
