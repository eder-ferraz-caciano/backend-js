const dayjs = require("dayjs")

exports.up = function(knex, Promise) {
    return knex.schema.createTable("project_documentation", table => {
        table.increments("id").primary();
        table.text("doc_md_text", "longtext").nullable();
        table.integer("project_id").unsigned().notNullable();
    
        table.foreign("project_id").references("id").inTable("project");

        table.string("created_by", 15);
        table.timestamp("created_at").nullable();
        table.string("updated_by", 15);
        table.timestamp("updated_at").nullable();
        table.string("deleted_by", 15);
        table.timestamp("deleted_at").nullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("project_documentation")
};
