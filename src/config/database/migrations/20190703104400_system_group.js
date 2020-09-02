const dayjs = require('dayjs')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('system_group', table => {
    table.increments('id').primary();
    table.string('name', 50).notNull();

    table.string('created_by', 10);
    table.timestamp('created_at').nullable();
    table.string('updated_by', 10);
    table.timestamp('updated_at').nullable();
    table.string('deleted_by', 10);
    table.timestamp('deleted_at').nullable();
  }).then(function () {
    return knex('system_group').insert(
      { name: 'ADMINISTRADOR', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  }).then(function () {
    return knex('system_group').insert(
      { name: 'USUARIO', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('system_group')
};
