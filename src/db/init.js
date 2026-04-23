const { sequelize } = require("../models");

const initDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initDB();