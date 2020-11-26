const dayjs = require('dayjs')

exports.up = function(knex,Promise) {
  return knex.schema.createTable('user_request', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('request_id').unsigned().notNullable();

    table.foreign('user_id').references('id').inTable('user');
    table.foreign('request_id').references('id').inTable('request_screen');

    table.string('created_by', 15);
    table.timestamp('created_at').nullable();
    table.string('updated_by', 15);
    table.timestamp('updated_at').nullable();
    table.string('deleted_by', 15);
    table.timestamp('deleted_at').nullable();
  }).then(function () {
    return knex('user_request').insert(
      { user_id: 1, request_id: 1, created_by: 'MIGRATE SYSTEM', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')});
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_request')
};
