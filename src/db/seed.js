const bcrypt = require("bcryptjs");
const { sequelize, User, Task, Session } = require("../models");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // reset DB

    console.log("Database reset...");

    // USERS
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.bulkCreate([
      {
        name: "Alice Johnson",
        age: 25,
        email: "alice@test.com",
        password: hashedPassword,
        role: "user"
      },
      {
        name: "Bobby Brown",
        age: 30,
        email: "bob@test.com",
        password: hashedPassword,
        role: "admin"
      },
    ], { returning: true });

    // TASKS
    const tasks = await Task.bulkCreate([
      {
        title: "Finish backend project",
        description: "Complete REST API MVP",
        priority: "high",
        status: "in_progress",
        estimatedDuration: 120,
        userId: users[0].userId,
      },
      {
        title: "Study database design",
        description: "Review relational models",
        priority: "medium",
        status: "pending",
        estimatedDuration: 60,
        userId: users[0].userId,
      },
      {
        title: "Workout",
        description: "Morning exercise",
        priority: "low",
        status: "completed",
        estimatedDuration: 30,
        userId: users[1].userId,
      },
    ]);

    // SESSIONS
    await Session.bulkCreate([
      {
        date: "2026-04-20",
        completionRate: 80,
        feedback: "Good productivity day",
        userId: users[0].userId,
      },
      {
        date: "2026-04-21",
        completionRate: 60,
        feedback: "Got distracted often",
        userId: users[0].userId,
      },
      {
        date: "2026-04-21",
        completionRate: 90,
        feedback: "Very focused day",
        userId: users[1].userId,
      },
    ]);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();