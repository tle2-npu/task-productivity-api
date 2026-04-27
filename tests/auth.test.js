const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../src/models");

// Setup test database before running tests
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Close DB connection after tests
afterAll(async () => {
  await sequelize.close();
});

describe("Authentication API", () => {

  // Register success
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("test@example.com");
  });

  // Register duplicate email
  it("should fail if email already exists", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

  // Login success
  it("should login successfully", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  // Login wrong password
  it("should fail with wrong password", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "test@example.com",
        password: "wrong"
      });

    expect(res.statusCode).toBe(401);
  });

});