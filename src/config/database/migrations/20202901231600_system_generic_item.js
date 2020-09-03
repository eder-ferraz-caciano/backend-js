// const dayjs = require('dayjs')

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('system_generic_itens', table => {
//       table.increments('id').primary();
//       table.integer('system_generic_id').unsigned().notNullable();
//       table.string('descricao', 50);

//       table.foreign('system_generic_id').references('id').inTable('system_generic');

//       table.string('created_by', 10);
//       table.timestamp('created_at').nullable();
//       table.string('updated_by', 10);
//       table.timestamp('updated_at').nullable();
//       table.string('deleted_by', 10);
//       table.timestamp('deleted_at').nullable();
//     })
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('system_generic_itens')
// };
