const express = require("express");
require("dotenv").config();

const logger = require("./src/middleware/logger.middleware");
const errorHandler = require("./src/middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Task Productivity API is running!" });
});

// error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});