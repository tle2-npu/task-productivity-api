const express = require("express");
require("dotenv").config();

const logger = require("./src/middleware/logger.middleware");
const errorHandler = require("./src/middleware/error.middleware");
const requestTime = require("./src/middleware/requestTime.middleware");

// import routes
const taskRoutes = require("./src/routes/task.routes");

const app = express();

// db connection
const { sequelize } = require("./src/models");

sequelize.authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB error:", err.message));

// built-in middlewares 
app.use(express.json());

// custom middlewares 
app.use(logger);
app.use(requestTime);

// routes 
app.get("/", (req, res) => {
  res.json({ 
    message: "Task Productivity API is running!",
    time: req.requestTime,
  });
});

// task routes 
app.use("/api/tasks", taskRoutes);

// error middleware
app.use(errorHandler);


// start server 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});