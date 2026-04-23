const sequelize = require("../db/database");

const User = require("./user.model");
const Task = require("./task.model");
const Session = require("./session.model");

// define relationships 

// User → Task 
User.hasMany(Task, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Task.belongsTo(User, {
  foreignKey: "userId",
});

// User → Session 
User.hasMany(Session, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Session.belongsTo(User, {
  foreignKey: "userId",
});

// export
module.exports = {
  sequelize,
  User,
  Task,
  Session,
};