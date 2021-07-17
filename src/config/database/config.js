/* eslint-disable no-undef */
module.exports = {
  client: process.env.DB_DIALECT,
  connection: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME
  },
  migrations: {
    tableName: process.env.DB_MIGRATIONS
  },
  pool: {
    max: 10,
    min: 2
  }
};
