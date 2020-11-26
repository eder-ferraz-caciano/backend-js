const dayjs = require('dayjs')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary();
    table.string('name', 60).nullable();
    table.string('login', 45).nullable();
    table.string('password', 250).nullable();
    table.string('email', 250).nullable();
    table.timestamp('birth_date').nullable();
    table.string('url_photograph', 250).nullable();
    table.string('telephone', 45).nullable();
    table.string('theme', 500).nullable();

    table.string('created_by', 15);
    table.timestamp('created_at').nullable();
    table.string('updated_by', 15);
    table.timestamp('updated_at').nullable();
    table.string('deleted_by', 15);
    table.timestamp('deleted_at').nullable();
  }).then(function () {
    return knex('user').insert(
      { 
        name: "Eder Ferraz Caciano",
        login: "ADMIN",
        password: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
        email: "eder.ferraz.caciano@hotmail.com",
        birth_date: "",
        url_photograph: "",
        telephone: "",
        theme: "",
        created_by: 'MIGRATE SYSTEM',
        created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};
