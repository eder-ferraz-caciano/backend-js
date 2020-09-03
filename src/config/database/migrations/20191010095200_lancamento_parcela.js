// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('lancamento_parcela', table => {
//     table.increments('id').primary();
//     table.string('numero_parcela', 3).notNull();
//     table.string('numero_documento');
//     table.timestamp('data_vencimento').nullable();
//     table.timestamp('data_pagamento').nullable();
//     table.decimal('valor_parcela');
//     table.decimal('valor_pago');

//     table.integer('lancamento_id').unsigned().notNullable();
//     table.integer('status_id').unsigned().notNullable();

//     table.foreign('lancamento_id').references('id').inTable('lancamento');
//     table.foreign('status_id').references('id').inTable('status');

//     table.string('created_by', 10);
//     table.timestamp('created_at').nullable();
//     table.string('updated_by', 10);
//     table.timestamp('updated_at').nullable();
//     table.string('deleted_by', 10);
//     table.timestamp('deleted_at').nullable();
//   });
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('lancamento_parcela')
// };
