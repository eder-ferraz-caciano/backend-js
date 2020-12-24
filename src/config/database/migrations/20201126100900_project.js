const dayjs = require("dayjs")

exports.up = function(knex, Promise) {
    return knex.schema.createTable("project", table => {
        table.increments("id").primary();
        table.string("name", 100).nullable();
        table.string("description", 250).nullable();
        table.timestamp("initialDate").nullable();
        table.timestamp("finalDate").nullable();
        table.string("icon", 60).nullable();
        table.string("iconColor", 45).nullable();

        table.string("created_by", 15);
        table.timestamp("created_at").nullable();
        table.string("updated_by", 15);
        table.timestamp("updated_at").nullable();
        table.string("deleted_by", 15);
        table.timestamp("deleted_at").nullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("project")
};
