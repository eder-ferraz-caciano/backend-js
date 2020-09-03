// const dayjs = require('dayjs')

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('system_program', table => {
//     table.increments('id').primary();
//     table.string('name', 50).notNull();
//     table.string('controller').notNull();
//     table.string('icon', 25);
//     table.string('children', 5);
//     table.string('obs', 100);

//     table.string('created_by', 10);
//     table.timestamp('created_at').nullable();
//     table.string('updated_by', 10);
//     table.timestamp('updated_at').nullable();
//     table.string('deleted_by', 10);
//     table.timestamp('deleted_at').nullable();

//   }).
//   then(function () {
//     return knex('system_program').insert(
//       { name: '1 - INICIO', controller: '/', icon: 'mdi-home',created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
//       )
//   }).then(function () {
//     return knex('system_program').insert(
//       { name: '4 - Configurações', controller: '', icon: 'mdi-cogs', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
//       )
//   }).then(function () {
//     return knex('system_program').insert(
//       { name: 'Tabela Genérica', controller: '/configuracoes/generica', children: 2, icon: '', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
//     )
//   }).then(function () {
//     return knex('system_program').insert(
//       { name: 'Programas X Grupo', controller: '/configuracoes/programa', children: 2, icon: '', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
//     )
//   }).then(function () {
//     return knex('system_program').insert(
//       { name: 'Grupo X Usuário', controller: '/configuracoes/grupo', children: 2, icon: '', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
//     )
//   }).then(function () {
//     return knex('system_program').insert(
//       { name: 'Usuário X Programa', controller: '/configuracoes/usuario', children: 2, icon: '', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
//     )
//   }).then(function () {
//     return knex('system_program').insert(
//       { name: '3 - Financeiro', controller: '', icon: 'mdi-cash-register', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
//     )
//   }).then(function () {
//     return knex('system_program').insert(
//       { name: 'Lançamentos', controller: '/financeiro/lancamentos', children: 7, icon: '', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
//     )
//   }).then(function () {
//     return knex('system_program').insert(
//       { name: '2 - Fornecedores', controller: '/fornecedor', icon: 'mdi-factory', created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
//     )
//   })
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('system_program')
// };
