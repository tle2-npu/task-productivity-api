const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "Task Productivity API is running!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});