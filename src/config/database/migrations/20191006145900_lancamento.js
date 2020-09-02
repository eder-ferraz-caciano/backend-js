exports.up = function(knex, Promise) {
  return knex.schema.createTable('lancamento', table => {
    table.increments('id').primary();
    table.string('descricao', 100).notNull();
    table.decimal('receita');
    table.decimal('despesa');
    table.decimal('valor_desconto');
    table.decimal('valor_pago');
    table.timestamp('data_pagamento').nullable();
    table.string('serie', 4);
    table.string('modelo', 4);
    table.string('numero_nf', 10);
    table.string('chave_nf', 50);
    table.timestamp('data_emissao').nullable();
    table.string('numero_parcela', 3);

    table.integer('competencia_id').unsigned().notNullable();
    table.integer('fornecedor_id').unsigned().notNullable();
    table.integer('status_id').unsigned().notNullable();
    table.integer('tipo_pagamento_id').unsigned().notNullable();
    table.integer('tipo_lancamento_id').unsigned().notNullable();

    table.foreign('competencia_id').references('id').inTable('competencia');
    table.foreign('fornecedor_id').references('id').inTable('fornecedor');
    table.foreign('status_id').references('id').inTable('status');
    table.foreign('tipo_pagamento_id').references('id').inTable('tipo_pagamento');
    table.foreign('tipo_lancamento_id').references('id').inTable('tipo_lancamento');

    table.string('created_by', 10);
    table.timestamp('created_at').nullable();
    table.string('updated_by', 10);
    table.timestamp('updated_at').nullable();
    table.string('deleted_by', 10);
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lancamento')
};
