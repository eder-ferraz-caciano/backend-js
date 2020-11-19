/* eslint-disable no-undef */
require("dotenv").config();
const bodyParse = require("body-parser");
const config = require("./src/config/database/config");
const consign = require("consign");
const cors = require("cors");
const express = require("express");
const knex = require("knex");
const logger = require("knex-logger");
// const path = require('path');

const app = express();

let database = knex(config);
app.db = database;

database = () => ({
    log: {
        debug(message) {
            console.log(message);
        },
        deprecate(message) {
            console.log(message);
        },
        error(message) {
            console.log(message);
        },
        warn(message) {
            console.log(message);
        },
    }
});

// -- Use a static client builder project
// const pathPublic = path.join(__dirname, '../public');
// app.use(express.static(pathPublic));

app.use(bodyParse.json());
app.use(cors());
if (process.env.APP_DEBUG === true) app.use(logger(database));

consign()
    .include("./src/core/passport.js")
    .then("./src/helpers/usuario.js")
    .then("./src/middleware/knexHook.js")
    .then("./src/controller/auth.js")
    .then("./src/controller/administration/user.js")
    .then("./src/controller/administration/screen.js")
    .then("./src/controller/administration/request_screen.js")
    .then("./src/controller/administration/user_screen.js")
    .then("./src/controller/administration/user_request.js")
    .then("./src/routes/")
    .into(app);

app.get("*", (req, res) => {
    // res.sendFile(path.join(pathPublic, 'index.html'))
    res.status(400).send({
        error: `Invalid access parameter.
    Please check the URL or Type of request.
    Ex: POST, GET, PUT or DELETE.
    http://url/request`
    });
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    // console.log(`
    // |======================================================|
    // |              BY EDER FERRAZ CACIANO                  |
    // |======================================================|
    // `)
    console.log(`Servidor inicializado! - Host: ${process.env.APP_HOST} - Port: ${process.env.APP_PORT} - Database: ${process.env.DB_DATABASE}`)
});
