const dayjs = require('dayjs')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('system_generic', table => {
      table.increments('id').primary();
      table.string('codigo', 4).notNull();
      table.string('descricao', 50);

      table.string('created_by', 10);
      table.timestamp('created_at').nullable();
      table.string('updated_by', 10);
      table.timestamp('updated_at').nullable();
      table.string('deleted_by', 10);
      table.timestamp('deleted_at').nullable();
    }).then(function () {
      return knex('system_generic').insert(
        { codigo: 'TG01', descricao: 'STATUS LANÇAMENTO', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      });
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('system_generic')
};
