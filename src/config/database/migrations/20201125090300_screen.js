const dayjs = require("dayjs")

exports.up = function (knex, Promise) {
  return knex.schema.createTable("screen", table => {
    table.increments("id").primary();
    table.string("name", 45).nullable();
    table.string("description", 250).nullable();
    table.string("url", 250).nullable();
    table.string("icon", 100).nullable();
    table.string("order", 4).nullable();
    table.string("icon_color", 25).nullable();

    table.string("created_by", 15);
    table.timestamp("created_at").nullable();
    table.string("updated_by", 15);
    table.timestamp("updated_at").nullable();
    table.string("deleted_by", 15);
    table.timestamp("deleted_at").nullable();
  }).then(() => {
    return knex("screen").insert({
      created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      created_by: "MIGRATE SYSTEM",
      description: "System Settings",
      icon: "mdi-cogs",
      icon_color: "secondary",
      name: "Settings",
      order: "10",
      url: "/settings"
    });
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("screen")
};
