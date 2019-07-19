const express = require('express');

const Actions = require('./actionModel.js');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const actions = await Actions.find();
      res.json(actions);
    } catch (err) {
      res.status(500).json({ message: "Failed to get actions" });
    }
  });

router.post("/", async (req, res) => {
    await Actions.add(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res.status(500).json({ message: "Action could not be added" });
      });
  });



module.exports = router;