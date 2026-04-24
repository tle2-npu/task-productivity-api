const request = require("supertest");
const app = require("../server");

describe("Task API", () => {

  // CREATE success
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "Test task",
        priority: "high"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test task");
  });

  // CREATE error (e.g. missing title)
  it("should fail if title is missing", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({});

    expect(res.statusCode).toBe(400);
  });

  // GET all
  it("should get all tasks", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // GET by invalid ID
  it("should return 404 for non-existing task", async () => {
    const res = await request(app).get("/api/tasks/9999");

    expect(res.statusCode).toBe(404);
  });

});