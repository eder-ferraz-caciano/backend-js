// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('fornecedor', table => {
//     table.increments('id').primary();
//     table.string('nome', 50).notNull();
//     table.string('endereco', 50);
//     table.string('ie', 15);
//     table.string('cpf_cnpj', 20);
//     table.string('obs');
//     table.string('uf', 15);
//     table.string('cidade', 25);
//     table.string('email', 40);
//     table.string('telefone', 20);
//     table.boolean('ativo').notNull().defaultTo(true);

//     table.string('created_by', 10);
//     table.timestamp('created_at').nullable();
//     table.string('updated_by', 10);
//     table.timestamp('updated_at').nullable();
//     table.string('deleted_by', 10);
//     table.timestamp('deleted_at').nullable();
//   })
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('fornecedor')
// };
