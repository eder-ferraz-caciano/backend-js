
module.exports = {

    client: "mysql",
    connection: {
        database: "admintemplate",
        user: "root",
        password: "1adsk2js5m",
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
    },

};