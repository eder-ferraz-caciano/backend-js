const jwt = require('jsonwebtoken')

module.exports = app => {
  // const { seExiste, seNaoExiste } = app.src.core.validations

  function userToken(req) {
    const token = String(req.headers['authorization'])
    const payload = jwt.verify(token.replace("Bearer ", ''), process.env.APP_KEY)

    return payload
  }

  return {
    userToken
  }
}
