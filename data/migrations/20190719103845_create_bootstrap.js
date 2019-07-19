exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.string("project_name", 256).notNullable();
      tbl.string("project_description", 350).notNullable();
      tbl.boolean("completed");
    })
    .createTable("actions", tbl => {
      tbl.increments();
      tbl.string("action_description", 350).notNullable();
      tbl.string("action_notes", 350);
      tbl.boolean("completed");
      tbl
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("projects").dropTableIfExists("actions");
};
