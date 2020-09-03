// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('competencia', table => {
//     table.increments('id').primary();
//     table.string('competencia', 10).notNull();
//     table.string('descricao', 50).notNull();
//     table.boolean('fechado').notNull().defaultTo(false);
//     table.decimal('saldo_anterior');
//     table.decimal('total_receita');
//     table.decimal('total_despesa');
//     table.decimal('saldo_mes');
//     table.decimal('saldo_atual');
//     table.timestamp('data_fechamento').nullable();

//     table.string('created_by', 10);
//     table.timestamp('created_at').nullable();
//     table.string('updated_by', 10);
//     table.timestamp('updated_at').nullable();
//     table.string('deleted_by', 10);
//     table.timestamp('deleted_at').nullable();
//   })
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('competencia')
// };
