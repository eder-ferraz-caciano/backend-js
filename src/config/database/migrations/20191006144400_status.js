const dayjs = require('dayjs')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('status', table => {
    table.increments('id').primary();
    table.string('descricao', 25).notNull();

    table.string('created_by', 10);
    table.timestamp('created_at').nullable();
    table.string('updated_by', 10);
    table.timestamp('updated_at').nullable();
    table.string('deleted_by', 10);
    table.timestamp('deleted_at').nullable();
  }).then(function () {
    return knex('status').insert(
      { descricao: 'PAGO', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  }).then(function () {
    return knex('status').insert(
      { descricao: 'ABERTO', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  }).then(function () {
    return knex('status').insert(
      { descricao: 'PARCIALMENTE PAGO', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('status')
};
