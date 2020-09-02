require('dotenv').config();
const bodyParse = require('body-parser');
let config = require('./src/config/database/config');
const consign = require('consign');
const cors = require('cors');
const express = require('express');
const knex = require('knex');
const logger = require('knex-logger');
const path = require('path');

const app = express();

const database = knex(config);
app.db = database;

database => ({
  log: {
   warn(message) {
     console.log(message);
   },
   error(message) {
    console.log(message);
   },
   deprecate(message) {
    console.log(message);
   },
   debug(message) {
    console.log(message);
   },
 }
});

const pathPublic = path.join(__dirname, '../public');

app.use(express.static(pathPublic));

app.use(bodyParse.json());
app.use(cors());
if (process.env.APP_DEBUG === true) app.use(logger(database));

consign()
  .include('./src/core/passport.js')
  .then('./src/core/validations.js')
  // .then('./src/helpers/grupo.js')
  // .then('./src/helpers/unidade.js')
  // .then('./src/helpers/programa.js')
  .then('./src/helpers/usuario.js')
  .then('./src/middleware/knexHook.js')
  // .then('./src/middleware/knexTransacao.js')
  .then('./src/controller/administration/user.js')
  .then('./src/routes/')
  .into(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(pathPublic, 'index.html'))
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  // console.log(`
  // |======================================================|
  // |              BY EDER FERRAZ CACIANO                  |
  // |======================================================|
  // `)
  console.log(`Servidor inicializado! - Host: ${process.env.APP_HOST} - Port: ${process.env.APP_PORT} - Database: ${process.env.DB_DATABASE}`)
});
