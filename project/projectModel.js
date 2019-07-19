const db = require("../data/db-config.js");

module.exports = {
  find,
  add,
  findActions,
  findById
};

function find() {
  return db("projects");
}

async function add(project) {
  return await db("projects").insert(project);
}

// function findActions(id) {
//     return db("projects as p")
//     .innerJoin("actions as a", "p.id", "a.project_id")
//     .select("p.id", "p.project_name", "a.action_description", "a.action_notes", "a.completed")
//     .where({ project_id: id })
// }

function findActions(id) {
    return db("actions as a")
    .innerJoin("projects as p", "p.id", "a.project_id")
    .select("a.id",  "a.action_description", "a.action_notes", "a.completed")
    .where({ project_id: id })
}

function findById(id) {
    return db('projects').first().where('projects.id', id);
}
