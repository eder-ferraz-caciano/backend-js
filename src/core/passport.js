const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
  const params = {
    secretOrKey: process.env.APP_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const strategy = new Strategy(params, async (payload, done) => {
    await app.db('system_user')
      .where({ id: payload.id })
      .first()
      .then(user => done(null, user ? { ...payload } : false))
      .catch(err => done(err, false))
  })

  passport.use(strategy)

  return {
    authenticate: () => passport.authenticate('jwt', { session: false })
  }
}