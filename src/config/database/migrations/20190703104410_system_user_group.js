const dayjs = require('dayjs')

exports.up = function(knex,Promise) {
  return knex.schema.createTable('system_user_group', table => {
    table.increments('id').primary();
    table.integer('system_group_id').unsigned().notNullable();
    table.integer('system_user_id').unsigned().notNullable();

    table.foreign('system_group_id').references('id').inTable('system_group');
    table.foreign('system_user_id').references('id').inTable('system_user');

    table.string('created_by', 10);
    table.timestamp('created_at').nullable();
    table.string('deleted_by', 10);
    table.timestamp('deleted_at').nullable();
  }).then(function () {
  return knex('system_user_group').insert(
    { system_group_id: 1, system_user_id: 1, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('system_user_group')
};
