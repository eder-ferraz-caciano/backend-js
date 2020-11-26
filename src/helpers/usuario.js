/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");

module.exports = () => {
    function userToken(req) {
        const token = String(req.headers["authorization"]);
        const payload = jwt.verify(token.replace("Bearer ", ""), process.env.APP_KEY);

        return payload;
    }

    return {
        userToken
    };

};
