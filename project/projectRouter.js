const express = require("express");

const Projects = require("./projectModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to get projects" });
  }
});

router.post("/", async (req, res) => {
  await Projects.add(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Project could not be added" });
    });
});

router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;
  const { project_name } = req.body
  console.log(project_name);

  try {
    const projects = await Projects.find();
    const actions = await Projects.findActions(id);
    
    if (actions.length) {
      res.json( {projects, actions});
    } else {
      res.status(404).json({ message: "could not find actions for project" });
    }
  } catch (err) {
    res.status(500).json({ message: "failed to get actions" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.findById(id);

    if (project) {
      res.json(project);
    } else {
      res
        .status(404)
        .json({ message: "Could not find project with given id." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get projects" });
  }
});

module.exports = router;
