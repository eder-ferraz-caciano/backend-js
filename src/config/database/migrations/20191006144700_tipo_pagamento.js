const dayjs = require('dayjs')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('tipo_pagamento', table => {
    table.increments('id').primary();
    table.string('descricao', 25).notNull();

    table.string('created_by', 10);
    table.timestamp('created_at').nullable();
    table.string('updated_by', 10);
    table.timestamp('updated_at').nullable();
    table.string('deleted_by', 10);
    table.timestamp('deleted_at').nullable();
  }).then(function () {
    return knex('tipo_pagamento').insert(
      { descricao: 'DINHEIRO', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  }).then(function () {
    return knex('tipo_pagamento').insert(
      { descricao: 'CARTÃO', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  }).then(function () {
    return knex('tipo_pagamento').insert(
      { descricao: 'CHEQUE', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  }).then(function () {
    return knex('tipo_pagamento').insert(
      { descricao: 'CREDIÁRIO', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  }).then(function () {
    return knex('tipo_pagamento').insert(
      { descricao: 'BOLETO', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  }).then(function () {
    return knex('tipo_pagamento').insert(
      { descricao: 'IGCARD', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
    )
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tipo_pagamento')
};
