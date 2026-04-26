const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");

const { isOwnerOrAdmin } = require("../middleware/role.middleware");
const { Task } = require("../models");

// GET all tasks
router.get("/", taskController.getAllTasks);

// GET task by id
router.get("/:id", taskController.getTaskById);

// CREATE task
router.post("/", taskController.createTask);

// UPDATE task
router.put("/:id", isOwnerOrAdmin(Task), taskController.updateTask);

// DELETE task
router.delete("/:id", isOwnerOrAdmin(Task), taskController.deleteTask);
module.exports = router;