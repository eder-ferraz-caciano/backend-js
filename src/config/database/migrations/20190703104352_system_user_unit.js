exports.up = function(knex, Promise) {
  return knex.schema.createTable('system_user_unit', table => {
    table.increments('id').primary();
    table.integer('system_user_id').unsigned().notNullable();
    table.integer('system_unit_id').unsigned().notNullable();

    table.foreign('system_user_id').references('id').inTable('system_user');
    table.foreign('system_unit_id').references('id').inTable('system_unit');

    table.string('created_by', 10);
    table.timestamp('created_at').nullable();
    table.string('deleted_by', 10);
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('system_user_unit')
};
