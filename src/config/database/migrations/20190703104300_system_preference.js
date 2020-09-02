exports.up = function(knex, Promise) {
  return knex.schema.createTable('system_preference', table => {
    table.increments('id').primary();
    table.string('value', 50).notNull();

    table.string('created_by', 10);
    table.timestamp('created_at').nullable();
    table.string('updated_by', 10);
    table.timestamp('updated_at').nullable();
    table.string('deleted_by', 10);
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('system_preference')
};
