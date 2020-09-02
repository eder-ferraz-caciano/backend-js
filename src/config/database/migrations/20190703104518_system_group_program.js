const dayjs = require('dayjs')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('system_group_program', table => {
    table.increments('id').primary();
    table.integer('system_group_id').unsigned().notNullable();
    table.integer('system_program_id').unsigned().notNullable();

    table.foreign('system_group_id').references('id').inTable('system_group');
    table.foreign('system_program_id').references('id').inTable('system_program');

    table.string('created_by', 10);
    table.timestamp('created_at').nullable();
    table.string('deleted_by', 10);
    table.timestamp('deleted_at').nullable();
  }).then(function () {
    return knex('system_group_program').insert(
      { system_group_id: 1, system_program_id: 1, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
      )
    }).then(function () {
    return knex('system_group_program').insert(
      { system_group_id: 1, system_program_id: 2, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
      )
    }).then(function () {
    return knex('system_group_program').insert(
      { system_group_id: 1, system_program_id: 3, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
      )
    }).then(function () {
    return knex('system_group_program').insert(
      { system_group_id: 1, system_program_id: 4, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
      )
    }).then(function () {
    return knex('system_group_program').insert(
      { system_group_id: 1, system_program_id: 5, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
      )
    }).then(function () {
    return knex('system_group_program').insert(
      { system_group_id: 1, system_program_id: 6, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
      )
    }).then(function () {
    return knex('system_group_program').insert(
      { system_group_id: 1, system_program_id: 7, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
      )
    }).then(function () {
    return knex('system_group_program').insert(
      { system_group_id: 1, system_program_id: 8, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
      )
    }).then(function () {
    return knex('system_group_program').insert(
      { system_group_id: 1, system_program_id: 9, created_by: 'SISTEMA', created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}
      )
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('system_group_program')
};
