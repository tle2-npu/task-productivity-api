const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  // hashed password for authentication
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // role for authorization 
  role: {
    type: DataTypes.STRING,
    defaultValue: "user" // user | admin
  }
});

module.exports = User;