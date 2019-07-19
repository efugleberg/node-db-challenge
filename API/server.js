const express = require("express");

const ActionRouter = require("../action/actionRouter.js");
const ProjectRouter = require("../project/projectRouter.js");

const server = express();

server.use(express.json());

server.use("/api/actions", ActionRouter);
server.use("/api/projects", ProjectRouter);

module.exports = server;
