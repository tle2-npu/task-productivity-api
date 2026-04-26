const express = require("express");
require("dotenv").config();

// security libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// database models
const { sequelize, User } = require("./src/models");

// custom middleware
const logger = require("./src/middleware/logger.middleware");
const errorHandler = require("./src/middleware/error.middleware");
const requestTime = require("./src/middleware/requestTime.middleware");

// import routes
const taskRoutes = require("./src/routes/task.routes");

const app = express();

// db connection
sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB error:", err.message));

// built-in middlewares (parse JSON request body)
app.use(express.json());

// custom middlewares 
app.use(logger);
app.use(requestTime);

// auth middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  // extract token
  const token = authHeader.split(" ")[1];

  try {
    // verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info to request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// task routes (protected)
app.use("/api/tasks", authMiddleware, taskRoutes);

// register endpoint
app.post("/api/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check duplicate email
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user 
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.userId,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    next(err);
  }
});

// login endpoint
app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find user 
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password with hashed password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
});

// logout endpoint 
app.post("/api/logout", (req, res) => {
  res.json({
    message: "Logout successful (client removes token)"
  });
});

// error middleware
app.use(errorHandler);

// start server 
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
}

module.exports = app;