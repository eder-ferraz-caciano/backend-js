// const dayjs = require('dayjs')

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('system_unit', table => {
//       table.increments('id').primary();
//       table.string('name', 50).notNull();
//       table.string('address', 50);
//       table.string('description', 100);

//       table.string('created_by', 10);
//       table.timestamp('created_at').nullable();
//       table.string('updated_by', 10);
//       table.timestamp('updated_at').nullable();
//       table.string('deleted_by', 10);
//       table.timestamp('deleted_at').nullable();
//     }).then(function () {
//       return knex('system_unit').insert(
//         { name: 'PRINCIPAL', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
//       });
//     })
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('system_unit')
// };
