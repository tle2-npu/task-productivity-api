const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");

// GET all tasks
router.get("/", taskController.getAllTasks);

// GET task by id
router.get("/:id", taskController.getTaskById);

// CREATE task
router.post("/", taskController.createTask);

// UPDATE task
router.put("/:id", taskController.updateTask);

// DELETE task
router.delete("/:id", taskController.deleteTask);

module.exports = router;