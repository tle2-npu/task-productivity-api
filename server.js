const express = require("express");
require("dotenv").config();

const logger = require("./src/middleware/logger.middleware");
const errorHandler = require("./src/middleware/error.middleware");

// import routes
const taskRoutes = require("./src/routes/task.routes");

const app = express();

// middlewares 
app.use(express.json());
app.use(logger);

// routes 
app.get("/", (req, res) => {
  res.json({ message: "Task Productivity API is running!" });
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