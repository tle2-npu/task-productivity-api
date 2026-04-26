const { Task } = require("../models");

// GET all tasks 
const getAllTasks = async (req, res, next) => {
  try {
    let tasks;

    // admin sees all
    if (req.user.role === "admin") {
      tasks = await Task.findAll();
    } 
    // user only sees their own tasks
    else {
      tasks = await Task.findAll({
        where: { userId: req.user.id }
      });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET task by ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // only admin can access
    if (req.user.role !== "admin" && task.userId !== req.user.id) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    res.status(200).json(task);

  } catch (error) {
    next(error);
  }
};

// CREATE task
const createTask = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      ...req.body,
      userId: req.user.id // enforce ownership
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// UPDATE task
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && task.userId !== req.user.id) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    // update
    await task.update(req.body);

    res.status(200).json(task);

  } catch (error) {
    next(error);
  }
};

// DELETE task
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && task.userId !== req.user.id) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    // delete
    await task.destroy();

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};