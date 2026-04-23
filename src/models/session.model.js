const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Session = sequelize.define("Session", {
  sessionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  completionRate: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 100,
    },
  },
  feedback: {
    type: DataTypes.TEXT,
  },
});

module.exports = Session;