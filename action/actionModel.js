const db = require("../data/db-config.js");

module.exports = {
  find,
  add
};

function find() {
  return db("actions");
}

async function add(action) {
  return await db("actions").insert(action);
}

// async function getByProject(project_id) {
//   return await db("actions").where({ project_id });
// }
