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
  Projects.findById(id).then(project => {
    Projects.findActions(project.id)
      .then(actions => {
        res
          .status(200)
          .json({
            id: project.id,
            name: project.project_name,
            description: project.project_description,
            completed: project.completed,
            actions: actions
          });
      })
      .catch(error => {
        res.status(500).json(error);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
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
