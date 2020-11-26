/* eslint-disable no-undef */
const passport = require("passport");
const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;

module.exports = app => {

    const params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.APP_KEY
    };

    const strategy = new Strategy(params, async (payload, done) => {
        await app.db("user")
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false));
    });

    passport.use(strategy);

    return {
        authenticate: () => passport.authenticate("jwt", { session: false })
    };
};
