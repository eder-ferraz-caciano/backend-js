const dayjs = require('dayjs')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('system_user', table => {
    table.increments('id').primary();
    table.string('name', 50).notNull();
    table.string('login', 10).notNull();
    table.string('password').notNull();
    table.string('email', 50).notNull().unique();
    table.boolean('active').notNull().defaultTo(false);

    table.string('created_by', 10);
    table.timestamp('created_at').nullable();
    table.string('updated_by', 10);
    table.timestamp('updated_at').nullable();
    table.string('deleted_by', 10);
    table.timestamp('deleted_at').nullable();
  }).then(function () {
    return knex('system_user').insert(
      { name: 'ADMIN', login: 'ADMIN', password: '$2a$10$YYxx5F6LoeOtbEK5HYkyvOjWuRbfJA72e2ovCzIGWFNbIIyLrU3NS', email: 'ADMIN@123.com', active: true, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('system_user')
};
