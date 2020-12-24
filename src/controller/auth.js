/* eslint-disable no-undef */
const dayjs = require("dayjs");
const jwt = require("jwt-simple");
const validate = require("validate.js");

module.exports = app => {

    const userValidate = {
        email: { presence: { allowEmpty: false } },
        password: { presence: { allowEmpty: false } }
    };

    const login = async (req, res) => {

        const erros = validate(req.body, userValidate);
        if (erros) return res.json({ erro: erros });

        try {

            const user = { ...req.body };
            // user.login = req.body.login.toUpperCase();

            const findUser = await app.db("user")
                .where({
                    email: user.email,
                    password: user.password
                })
                .first();

            if (!findUser) return res.json({ erro: "User not found!" });

            if (String(req.body.password) !== String(findUser.password)) {
                return res.json({ erro: "User or password not found!" });
            }

            const now = Math.floor(Date.now() / 1000);
            const payload = {
                email: findUser.email,
                exp: (now + 60) * 60,
                iat: now,
                id: findUser.id,
                login: findUser.login,
                name: findUser.name
            };

            res.json({
                ...payload,
                token: jwt.encode(payload, process.env.APP_KEY)
            });

        } catch (error) {
            res.send({ aviso: "Request error.", erro: error });
        }
    };

    const validateToken = async (req, res) => {
        let token = req.headers && req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : null
        if (token) {
            let decoded = jwt.decode(String(token), process.env.APP_KEY)
            const tokenExpirada = String(decoded.exp) < dayjs().format("YYYY-MM-DD HH:mm:ss")

            if (tokenExpirada === false) {
                return true;
            }

            return false
        }
    }

    return { login, validateToken };
};
