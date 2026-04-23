const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Task = sequelize.define("Task", {
  taskId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  },
  status: {
    type: DataTypes.ENUM("pending", "in_progress", "completed"),
    defaultValue: "pending",
  },
  estimatedDuration: {
    type: DataTypes.INTEGER, // minutes
  },
});

module.exports = Task;