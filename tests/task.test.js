const request = require("supertest");
const app = require("../server"); // Import your Express app
const { sequelize } = require("../src/models");

let token; // store JWT token

beforeAll(async () => {

  // sync database
  await sequelize.sync({ force: true });

  // register user
  await request(app).post("/api/register").send({
    name: "Task User",
    email: "task@test.com",
    password: "123456"
  });

  // login to get token
  const res = await request(app).post("/api/login").send({
    email: "task@test.com",
    password: "123456"
  });

  token = res.body.token;
});

// cleanup
afterAll(async () => {
  await sequelize.close();
});

describe("Task API", () => {

  // CREATE success
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test task",
        priority: "high"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test task");
  });

  // CREATE error (missing title)
  it("should fail if title is missing", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  // GET all tasks
  it("should get all tasks", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // SEARCH feature
  it("should search tasks by title", async () => {
    const res = await request(app)
      .get("/api/tasks?search=Test")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  // GET invalid ID
  it("should return 404 for non-existing task", async () => {
    const res = await request(app)
      .get("/api/tasks/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });

  // ERROR - no token
  it("should fail without token", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(401);
  });

});