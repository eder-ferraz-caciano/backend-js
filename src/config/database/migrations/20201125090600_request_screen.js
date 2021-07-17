const dayjs = require("dayjs")

exports.up = function (knex, Promise) {
  return knex.schema.createTable("request_screen", table => {
    table.increments("id").primary();
    table.integer("screen_id").unsigned().notNullable();
    table.string("description", 250).nullable();
    table.string("url", 250).nullable();
    table.string("note", 250).nullable();

    table.foreign("screen_id").references("id").inTable("screen");

    table.string("created_by", 15);
    table.timestamp("created_at").nullable();
    table.string("updated_by", 15);
    table.timestamp("updated_at").nullable();
    table.string("deleted_by", 15);
    table.timestamp("deleted_at").nullable();
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user/listar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user/editar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user/exibir/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user-screen/telas-usuario/:userId", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user-screen/usuarios-tela/:screenId", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user-screen/salvar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user-screen/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user-request/listar/:userId", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user-request/salvar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/user-request/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/screen/listar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/screen/salvar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/screen/editar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/screen/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/screen/exibir/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/request-screen/listar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/request-screen/salvar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/request-screen/editar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/request-screen/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_screen").insert({ screen_id: 1, url: "/request-screen/exibir/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("request_screen")
};
